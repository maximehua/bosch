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
            return {
                sensor : "ARH_NAMI1_1",
                name: "Hygrometrie",
                unit: "%"
            };
            break;
            case "Pluviometrie":
            return {
                sensor : 0,
                name: "Pluviometrie",
                unit: "ml"
            };
            break;
            case "Vent":
            return {
                sensor : 0,
                name: "Vent",
                unit: "m/s"
            };;
            break;
            case "TemperatureAir":
            return {
                sensor : "TA_NAMI1_1",
                name: "Temperature Air",
                unit: "°C"
            };
            break;
            case "TemperatureSol":
            return {
                sensor : "TS_AM1_1",
                name: "Temperature Sol",
                unit: "°C"
            };
            break;
            case "HumiditeSol":
            return {
                sensor : "WPS_AM1_1",
                name: "Humidité Sol",
                unit: "%"
            };
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
