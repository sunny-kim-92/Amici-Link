# amici-help
A set of programs and tools used for collecting and analyzing data
for an upcoming article on amicus briefs in the October 2018 term
of the Supreme Court.

index.js - Gathers information from SCOTUSblog.com using Cheerio.js
for scraping. Gathers case titles, names of groups who have filed
amicus briefs, and links to each case page on SCOTUSblog

caseLinksArr.js - Array with links to each case page on SCOTUSblog.com

caseTitlesArr.js - Array of case titles, provides index number which is used
for charts and articles

filersArr.js - Array of groups that have filed amicus briefs for each case. Gathers
from the title as listed on SCOTUSblog.com

linkcounter.js - Small function to count total number of amicus briefs

pdfLinkGen.js - Function to programmatically attain PDF links of amicus briefs for
each case

stateCounter.js - Function that filters amicus brief filers to only states

stateFilers.js - Array of states that filed amicus briefs grouped by case. This
provides a list of all entities that have a US state in their name, not
necessarily states/state attorney generals themselves. This data was collected by
manually opening each PDF and counting states listed within the PDF acknowledgemenets.