var Locale = {}

Locale.dateFormat = 'tt-mm-jj';
Locale.timeFormat = 'ss:mm';
Locale.dateAriaLabel = 'Datum, benotzt "STRG" ant Pfeiltasten fir ze navigeiren, "Enter" fier ze wielen';
Locale.loading = "Lued...";
Locale.edit = "Trajet wiehlen";
Locale.plan = "Trajet plangen";
Locale.geocoderInput = "Bahnstation, Bushaltestelle oder Addresse";
Locale.startpointEmpty = "Keen Start gewählt";
Locale.noStartpointSelected = "Keen gültegen Start gewielt";
Locale.destinationEmpty = "Keen Ziel gewielt";
Locale.noDestinationSelected = "Kein gültegt Ziel gewählt";
Locale.noValidDate = "Een gültegt Datum anfügen";
Locale.noValidTime = "Eng gülteg Zeit anfügen";
Locale.dateTooEarly = function ( minDate8601 ) { return "Desen Trajet Planger  for travel dates starting "+minDate8601.split('-').reverse().join('-'); }
Locale.dateTooLate = function ( maxDate8601 ) { return "This trip planner works for travel dates till "+maxDate8601.split('-').reverse().join('-'); }
Locale.from = "Von";
Locale.via = "Via";
Locale.to = "Bis";
Locale.date = "Datum";
Locale.time = "Zeit";
Locale.months = ['Januar','Februar','März','Abrell','Mee','Juni','Juli','August','September','October','November','December'];
Locale.days = ['Sonndeg','Meinden','Densden','Mettwoch','Donneschden','Freiden','Samsten'];
Locale.daysMin = ['Su','Mo','Die','Mi','Do','Fr','Sa'];
Locale.earlier = 'Mei Frei';
Locale.later = 'Mei Speit';
Locale.noAdviceFound = 'Keng Fahrten passen ear Sich';
Locale.walk = 'Ginn';
Locale.platformrail = 'Platform';
Locale.platform = 'Platform';
Locale.amountTransfers = function ( transfers ) { if (transfers == 0) { return 'Direct'; } else { return transfers+ ' transfers';} }
Locale.autocompleteMessages = {
        noResults: "No results found.",
        results: function( amount ) {
            return amount + ( amount > 1 ? " results are " : " result is" ) + " available, use the up and down arrow keys to navigate them.";
