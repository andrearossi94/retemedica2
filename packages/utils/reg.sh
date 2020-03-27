#!/bin/bash
echo "Registriamo alcune identità in Fabric"
node register2.js dottore1 dottore ortopedico
node register2.js dottore2 dottore cardiologo
node register2.js paziente1 paziente
node register2.js paziente2 paziente
echo "FINE"
