sensors = {
    sensorList : [
        "TS_AM1_1",
        "TS_AM1_2",
        "TS_AM1_3",
        "TA_NAMI1_1",
        "AP_NAMI1_1",
        "ARH_NAMI1_1",
        "PAR_SG_1",
        "PAR_AM1_X",
    ],
    get : (data)=>{
        switch (data) {
            case "Hygrometrie":
            return 0;
            break;
            case "Pluviometrie":
            return 0;
            break;
            case "Vent":
            return 0;
            break;
            case "TemperatureAir":
            return "TA_NAMI1_1";
            break;
            case "TemperatureSol":
            return "TS_AM1_1";
            break;
            case "HumiditeSol":
            return "ARH_NAMI1_1";
            break;
            default :
            return 0;
        }
    }

}

// TS = Temperature Soil
// Température du sol en °C
// TS_AM1_1 30cm
// TS_AM1_2 60cm
// TS_AM1_3 90cm
// Si -9999.99 => sonde non connecté
//
// TA_NAMI1_1 => Temperature air en °C
// AP_NAMI1_1 => Air pressure en pascal
// ARH_NAMI1_1 => Humidité air relave en %
//
// PAR_SG_1 => luminosité tournesol en lux
// PAR_AM1_X => luminosité sol en lux (11 capteurs)
