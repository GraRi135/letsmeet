var Locale = {}

Locale.dateFormat = 'tt-mm-jj';
Locale.timeFormat = 'ss:mm';
Locale.dateAriaLabel = 'Datum, nutzen sie "STRG" und Pfeiltasten zum navigieren, "Enter" zum wählen';
Locale.loading = "Laden...";
Locale.edit = "Fahrt wählen";
Locale.plan = "Fahrt planen";
Locale.geocoderInput = "Bahnstation, Bushaltestelle oder Addresse";
Locale.startpointEmpty = "Kein Start gewählt";
Locale.noStartpointSelected = "Kein gültiger Start gewählt";
Locale.destinationEmpty = "Kein Ziel gewählt";
Locale.noDestinationSelected = "Kein gültiges Ziel gewählt";
Locale.noValidDate = "Fügen sie ein gültiges Datum ein";
Locale.noValidTime = "Fügen sie eine gültige Zeit ein";
Locale.dateTooEarly = function ( minDate8601 ) { return "Dieser Fahrt Planer  for travel dates starting "+minDate8601.split('-').reverse().join('-'); }
Locale.dateTooLate = function ( maxDate8601 ) { return "This trip planner works for travel dates till "+maxDate8601.split('-').reverse().join('-'); }
Locale.from = "Von";
Locale.via = "Via";
Locale.to = "Zu";
Locale.date = "Datum";
Locale.time = "Zeit";
Locale.months = ['januar','Februar','März','April','Mai','Juni','Juli','August','September','October','November','December'];
Locale.days = ['Sonntag','Montag','Diestag','Mittwoch','Donnerstag','Freitag','Samstag'];
Locale.daysMin = ['Su','Mo','Die','Mi','Do','Fr','Sa'];
Locale.earlier = 'Früher';
Locale.later = 'Später';
Locale.noAdviceFound = 'Keine Fahrten passen ihrer Suche';
Locale.walk = 'Gehen';
Locale.platformrail = 'Platform';
Locale.platform = 'Platform';
Locale.amountTransfers = function ( transfers ) { if (transfers == 0) { return 'Direct'; } else { return transfers+ ' transfers';} }
Locale.autocompleteMessages = {
        noResults: "No results found.",
        results: function( amount ) {
            return amount + ( amount > 1 ? " results are " : " result is" ) + " available, use the up and down arrow keys to navigate them.";
        }
