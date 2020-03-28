#!/bin/bash
echo "Inseriamo alcuni dati nel database"
hurl invoke cartellaclinica personale_register "{ \"id\": \"Dot1\", \"nome\": \"Mario\", \"cognome\": \"Rossi\", \"username\": \"mr1976\", \"password\": \"mario123\", \"roles\": [\"DOC\"] }" -u dottore1
hurl invoke cartellaclinica personale_register "{ \"id\": \"Dot2\", \"nome\": \"Luigi\", \"cognome\": \"Verdi\", \"username\": \"lv1986\", \"password\": \"luigi123\", \"roles\": [\"DOC\"] }" -u dottore2
hurl invoke cartellaclinica personale_register "{ \"id\": \"Paz1\", \"nome\": \"Andrea\", \"cognome\": \"Bianchi\", \"username\": \"ab1996\", \"password\": \"andrea123\" }" -u paziente1
hurl invoke cartellaclinica personale_register "{ \"id\": \"Paz2\", \"nome\": \"Paolo\", \"cognome\": \"Boh\", \"username\": \"pb1992\", \"password\": \"paolo123\" }" -u paziente2
hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"Cart11\", \"pazienteID\": \"Paz1\", \"dottoreID\": \"Dot1\", \"patologia\": \"Frattura\",\"stato\": true, \"consenso\": true }" -u dottore1
hurl invoke cartellaclinica cartellaclinica_create "{ \"id\": \"Cart22\", \"pazienteID\": \"Paz2\", \"dottoreID\": \"Dot2\", \"patologia\": \"Trauma\", \"stato\": true, \"consenso\": true }" -u dottore2
echo "Dati inseriti correttamente"
