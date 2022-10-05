# TTNHelloWorld - Guide

## Menu

1. [TTN configurations](#ttn-configurations)  
  1.1 [Application](#application)  
  1.2 [OTAA end device](#otaa-end-device)  
  1.3 [ABP end device](#abp-end-device)  
  1.4 [Payload Formatter](#payload-formatter)  
2. [Software](#software)  
  2.1 [End devices key configuration](#end-devices-key-configuration)  
  2.2 [LMIC library](#lmic-library)  
  2.3 [Pinmap](#pinmap)
3. [Hardware](#hardware)  
  3.1 [Heltec LoRa V2](#heltec-lora-v2)  
  3.2 [RFM95w](#rfm95w)  
5. [Other issues](#other-issues)  
6. [Credits](#credits)  


## TTN configurations
At first, log in (or create an account) on [The Things Network](https://console.cloud.thethings.network/). Choose Australia 1.  

#### Application
On **Applications** tab, press the blue button **+ Add application**.  
Set Application ID. Optionally, set an Application name and add a description.  
![Application configuration on TTN](/assets/images/application.png).  
Finally, **Create application**.  
Choose between [OTAA](#otaa-end-device) or [ABP](#abp-end-device) configuration.  

#### OTAA end device
Once in a application, enter **End devices** tab and press the blue button **+ Add end device**.   
Choose the **Manually** tab.
- Frequency plan: Australia 915-928 MHz, FSB 2 (used bt TTN)
- LoRaWAN Version: LoRaWAN Specification 1.0.3
- DevEUI: *can be generate automatically*
- AppEUI: *must have, at least, a non-zero digit*
- AppKey: *can be generate aumatically*
- End device ID: *An ID for the device*  
![End device OTAA configuration on TTN](/assets/images/enddeviceotta.png).  
Finally, **Register end device**

#### ABP end device
Once in a application, enter **End devices** tab and press the blue button **+ Add end device**.   
Choose the **Manually** tab.
- Frequency plan: Australia 915-928 MHz, FSB 2 (used bt TTN)
- LoRaWAN Version: LoRaWAN Specification 1.0.3  

Expand the session **Show advanced activation, LoRaWAN class and cluster settings**
On **Activation mode** select **Activation by personalization (ABP)** option.

- DevEUI: *can be generate automatically*
- Device address: *can be generate automatically*
- AppSKey: *can be generate aumatically*
- NwkSKey: *can be generate automatically*
- End device ID: *An ID for the device*  
![End device OTAA configuration on TTN](/assets/images/enddeviceabp.png)  
Finally, **Register end device**

#### Payload Formatter
On an end device page, go to **Payload formatter** tab.  
On **Uplink** tab, change **Formatter type** to **Custom JavaScript formatter**.  
Input the script below on **Formater code** screen.  
```
function decodeUplink(input) {
  return {
    data: {
      msg: String.fromCharCode.apply(null, input.bytes)
    },
    warnings: [],
    errors: []
  };
}
```


## Software

#### End devices key configuration  
On **`main.ino`**, select the end device activation mode by commenting/uncommenting the option.  
```
#define USE_OTAA
//#define USE_ABP
```
Copy and paste the end device keys on the reserverd variables (lines 13-15 to ABP or lines 22-26 to OTAA)  
In case of OTAA configuration the keys AppEUI and DevEUI must be in lsb format.  
  - You can copy alredy formatted directly by the end device page on TTN. **<>** *Toggle array formatting*, <- -> *Switch byte order*

#### LMIC library
Import [mcci_catena/arduino-lmic](https://github.com/mcci-catena/arduino-lmic) library into your project    
On `/project_config/lmic_project_config.h` comment the line **`#define CFG_us915 1`** and uncomment the line **`//#define CFG_au915 1`**  
This file should be:  
```
// project-specific definitions
//#define CFG_eu868 1
//#define CFG_us915 1
#define CFG_au915 1
//#define CFG_as923 1
// #define LMIC_COUNTRY_CODE LMIC_COUNTRY_CODE_JP      /* for as923-JP; also define CFG_as923 */
//#define CFG_kr920 1
//#define CFG_in866 1
#define CFG_sx1276_radio 1
//#define LMIC_USE_INTERRUPTS
```

#### Pinmap
Set LoRa pins on struct
```
const lmic_pinmap lmic_pins = {
    .nss =  ,
    .rxtx = ,
    .rst =  , 
    .dio = { , , },
};
```
Line 37-42


## Hardware
#### Heltec LoRa V2
The hardware used was Heltec LoRa V2.  
![Heltec Lora V2 Pinout](/assets/images/heltec.png)  
To program by Arduino IDE is necessary add the address http://arduino.esp8266.com/stable/package_esp8266com_index.json on **File > Preferences > Additional Boards Manager URL**  
![Arduino preferences](https://user-images.githubusercontent.com/276504/50922035-c31aea80-1449-11e9-862e-57945f6f8b6a.png)  
The pinmap for this board is
```
    .nss = 18,
    .rxtx = LMIC_UNUSED_PIN,
    .rst = 14, 
    .dio = {26, 35, 34},
```

#### RFM95w
RFM95w is a LoRa Module.  
![RFM95w](https://5.imimg.com/data5/SELLER/Default/2022/1/NN/XT/WO/1833510/tap-sensor-module-for-arduino-500x500.JPG)  
Its pinmap depends of connections with a microcontroller.

## Other issues
#### hal/hal.h hal_init()
In my tests, I had some issues with the function `hal_init()` on `/arduino-lmic/src/hal/hal.cpp` because duplicity with another function alredy setted on Heltec Lora v2 board to Arduino IDE. So I just change the name of this function and everythings worked fine.


## Credits
This guide is based on [ERRC 2021](https://github.com/afpastorio/ERRC-2021) repository developed by @afpastorio and was written by @jamersonm
