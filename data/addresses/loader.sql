
drop materialized view geocoder_search;
drop view address_search;
drop table address;
create table address(id text, rue text, numero text, localite text, codepostal text, coord_east float, coord_north float, lat float, lon float, id_caclr_rue integer, id_caclr_bat integer);
\copy address from 'adresses.csv' delimiter ';' csv header encoding 'LATIN-1';
create view address_search as select address.*,''::text as name,to_tsvector(numero||' '||rue||' '||codepostal||' '||localite) as search, 'address'::text as type from address;

drop view stop_search;
drop table stops;
create table stops (stop_id text, stop_code text, stop_name text, stop_desc text, stop_lat float, stop_lon float, zone_id text, stop_url text, location_type integer, parent_startion text, stop_timezone text, wheelchair_boarding integer);
\copy stops from '../gtfs/stops.txt' csv header;
create view stop_search as select min(stop_id) as id, case when split_part(stop_name, ', ', 2) = ''::text then stop_name else split_part(stop_name, ', ', 2) end as name, ''::text as rue, ''::text as numero, split_part(stop_name, ', ', 1) as localite, ''::text as codepostal, 0.0::float as coord_east, 0.0::float as coord_north, avg(stop_lat) as lat, avg(stop_lon) as lon, 0::integer as id_caclr_rue, 0::integer as id_caclr_bat, to_tsvector(split_part(stop_name, ', ', 1) || ' ' || split_part(stop_name, ', ', 2)) as search, 'stop'::text  as type from stops group by stop_name;

create materialized view geocoder_search as select id, name, rue, numero, localite, codepostal, coord_east, coord_north, lat, lon, id_caclr_rue, id_caclr_bat, search, type from address_search union all select id, name, rue, numero, localite, codepostal, coord_east, coord_north, lat, lon, id_caclr_rue, id_caclr_bat, search, type from stop_search;

create index geocoder_search_index on geocoder_search using gin (search tsvector_ops);

