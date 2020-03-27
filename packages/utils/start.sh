#!/bin/bash
echo "Inseriamo alcuni dati nel database"
hurl invoke cartellaclinica personale_register "{ \"id\": \"1-100-999\", \"nome\": \"Mario\", \"cognome\": \"Rossi\", \"username\": \"mr1976\", \"password\": \"mario123\", \"roles\": [\"DOC\"] }" -u dottore1
hurl invoke cartellaclinica personale_register "{ \"id\": \"1-100-666\", \"nome\": \"Luigi\", \"cognome\": \"Verdi\", \"username\": \"lv1986\", \"password\": \"luigi123\", \"roles\": [\"DOC\"] }" -u dottore2
hurl invoke cartellaclinica personale_register "{ \"id\": \"1-100-111\", \"nome\": \"Andrea\", \"cognome\": \"Bianchi\", \"username\": \"ab1996\", \"password\": \"andrea123\" }" -u paziente1
hurl invoke cartellaclinica personale_register "{ \"id\": \"1-100-222\", \"nome\": \"Paolo\", \"cognome\": \"Boh\", \"username\": \"pb1992\", \"password\": \"paolo123\" }" -u paziente2
hurl invoke cartellaclinica cartellaclinica_create "Cart11" "Trauma" "1-100-111" "1-100-999" true true -u dottore1
hurl invoke cartellaclinica cartellaclinica_create "Cart22" "Polmonite" "1-100-222" "1-100-666" true true -u dottore2
echo "Dati inseriti correttamente"
