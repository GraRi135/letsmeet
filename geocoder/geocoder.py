import uwsgi
import re
import psycopg2
import psycopg2.extras
import json

COMMON_HEADERS_JSON = [('Content-Type', 'application/vnd.geo+json; charset=utf-8'), ('Access-Control-Allow-Origin', '*'), ('Access-Control-Allow-Headers', 'Requested-With,Content-Type')]

def bag42(environ, start_response):
    conn = psycopg2.connect("dbname='geocoder' user='geocoder' host='localhost' password='1234'")
    query = environ['PATH_INFO']
    if query == '/':
        query = environ['QUERY_STRING']
    
    geojson = { 'type': 'FeatureCollection', 'features': [] }
    
    search = query.replace('*', '')
    if search == '':
        output = json.dumps(geojson)
    	start_response('404 Not Found', COMMON_HEADERS_JSON + [('Content-Length', str(len(output)))])
        return output

    search = re.sub( '\s+', ' ', search )
    search = re.sub('[^0-9a-zA-Z ]+', ' ', search)
    search = re.sub(' +', ' ', search)

    parts = search.strip().split(' ')

    if len(parts[-1]) <= 2:
        search = '(' + ' & '.join([s + ':*' for s in search.strip().split(' ')]) + ') | (' + ' & '.join([s + ':*' for s in parts[0:-1]] + [parts[-1]]) + ')'
    else:             
        search = ' & '.join([s + ':*' for s in search.strip().split(' ')])

    limit = 10;

    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)

    cursor.execute("select *, ts_rank_cd(search, query) AS rank from geocoder_search, to_tsquery('simple', %s) as query where query @@ search ORDER BY rank DESC LIMIT %s;" , (search, limit, ))

    geojson = { 'type': 'FeatureCollection', 'features': [] }
    row = cursor.fetchone()
    while row is not None:
        if row['name'] == row['localite']:
            search = row['name'].strip()
        else:
            search = ' '.join([x for x in [row['rue'], str(row['numero'] or ''), str(row['localite'] or '')] if x != ''])
            if row['name'] != '' and search != '':
                search = row['name'] + ', ' + search
            else:
                search = row['name']
        properties = {'search': search}
        for k in row.keys():
           if row[k] is not None and row[k] != '' and k != 'lat' and k != 'lon' and k != 'search' and k != id and k != 'query':
               properties[k] = row[k]

        geojson['features'].append({'type': 'Feature', 'id': row['id'], 'geometry': { 'type': 'Point', 'coordinates': [float(row['lon']), float(row['lat'])] }, 'properties': properties })
        row = cursor.fetchone()

    output = json.dumps(geojson)
    start_response('200 OK', COMMON_HEADERS_JSON + [('Content-Length', str(len(output)))])
    return output

uwsgi.applications = {'': bag42}
