---
title: Future Proof Smart Home
subtitle: NRF52840 wonders and what smart home is and will do with it and javascript
cover: https://www.smarthomeperfected.com/wp-content/uploads/2021/06/matter-protocol2-scaled.jpg
date: 05/10/2022
tags:
- hardware
- protocols
categories:
- [diy, switch]
- [diy, socket]
- [diy, relay-switch]
- [NRF52840, bluetooth]
- [NRF52840, 802.15.4]
- [NRF52840, matter]


---

# History for smart homes.


 It all started with the idea of fobs ![fob](https://www.ptcondo.com/wp-content/uploads/2017/10/Security-fobs-2017.jpg) that are used to open gates for condos/apartments.

Then companies like zigbee and z-wave expanded their 433 mhz fob to higher frequencies and the idea was formed that we have remotes for our TV why don't we expand this further to lights. Over time this technology got dimistified a little and wifi relay switches came to market in any shape or form. ![wifi switch](https://ae01.alicdn.com/kf/HTB1ruZIRFXXXXXwXpXXq6xXFXXXn/1CH-7V-9V-12V-24V-DC-WiFi-Switch-Relay-Domotica-Module-Control-by-Phone-On-Android.jpg)

and since they operate on wifi 2.4ghz, and they get connected with an IP address, from there on, its not hard to figure out that our smart phones are also connected to a wifi router.

So as things came on the net more and more and the term IoT got more popular, everything had wifi, to the point where the router itself was having issues as it wasn't designed to handle this amount of volume of devices connected. 

the Z companies saw this as an opportunity to provide devices that:
- have low power requirements
- operate on lower frequencies, does not congest your home internet.
- have further reach than wifi and are not stuck on 2.4 Ghz band.
- Operate entirely by themselves with convoluted networks.

But their solution is to just replace the router with a router of their own, making things more expensive, locked in and specific to the company app which only lives as long as the company is doing well.

Geeks moved onto what their google offering home assistant, while apple customers also have a solution of their own with homekit splitting this already pretty complicated mess even further.

But no worries, just like in video land, when companies are being greedy or stupid for too many years in a row, they come up with their Alice codec alternative, in this case, an universal standard that will be just as bad of a problem as AV1 codec. No hardware support pretty much across the board, even the standard itself was not finalised until 2022. So just like with the video codec where more people adopted the highly licensed HEVC codec anyways because there is support everywhere already for it, same happens here with smart homes and zigbee. Zigbee makes a promise that they already are going the right direction and everybody falls for their obvious lie. There are other kinds of people who think Z-Wave is still a good option because its got a javascript library that opens up everything about how it works. And once again, the work remains divided across the 3 teams that seem to be on top of it, ignoring the fact that there are still other approaches on smaller scale being taken.

# how do we help the team that needs our help

Currently [Matter](https://github.com/project-chip/connectedhomeip) proposed protocol is available on [github](https://github.com/project-chip/connectedhomeip). There is also the project [node-matter](https://github.com/mfucci/node-matter) which is the javascript version slightly behind the C++ official version, but we can get enough of an idea how to go about this to get a smart home working in the future standard. Contributing to these two projects is far better than still picking sides. For hardware, this can start as cheap as €10.40 [from Farnell for NRF52840 dongle](https://ie.farnell.com/nordic-semiconductor/nrf52840-dongle/bluetooth-module-v5-2mbps/dp/2902521) and while there are other devices that support all the required hardware Nordic the company only makes 2 of these that support the protocols needed: [nRF5340](https://www.nordicsemi.com/Products/nRF5340), nRF52840. if you're a hardware intusiast look them up, the chip itself is much cheaper. Otherwise just get the dongle and start making the smart home.

# Starting totorial
{% youtube ngi-fid8034 %}

:::tip TODO

Later on, I'll go into more details about my experience with the dongle, and whether I'm able to run the javascript Matter version on the dongle.

:::
