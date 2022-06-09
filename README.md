# 🪡 Needlework
Needlework helps make hextech crafting faster, easier, and newsier from the 
League of Legends client. Process hextech loot with much fewer~* clicks, learn 
the total blue essence or orange essence value of your loot stash, bee happy! :3

# Table of Contents
1. [Guide](#Guide)
2. [FAQ](#FAQ)
3. [Developers](#Developers)

# Guide
## Out-of-box experience a.k.a. Getting started
When running Needlework for the first time, the title loading screen will 
appear before launching the Home view. The view should be similar enough to the 
screenshot above.

It is normal for the loot icons to be :bee_mad: during this experience (longer 
than usual). Needlework is currently fetching the loot icons needed. These 
icons are cached for later use, so the corresponding servers are not 
excessively called each time the program is used.

Needlework supports **dark mode**, which is disabled by default. To toggle, 
click on the cog/gear icon on the upper-left corner. This is the Settings view. 
Click the checkmark box for dark mode. Clicking on *Exit* will save your 
settings for future use before returning back to the Home view.

## Bulk hextech crafting (wowie!)
Bulk hextech crafting can be done by accessing the **Hextech automation** menu 
button. Each action, sans auto-craft, will give a confirmation prompt to avoid 
accidental crafting. Items upon successful craft will be displayed in the 
**Crafted** panel. 

The following actions are currently supported:
* **Auto-craft key fragments**

Disabled by default. Enabling this option will auto craft key fragments into 
hextech keys when available upon the next player loot event.
* **Disenchant all champion shards**

Will attempt to disenchant all champion shards available. Does not follow any 
rules.
* **Disenchant all champion permanents**

Same as above, but with champion permanents.
* **Smart disenchant all champion shards**

Will attempt to smart disenchant all champion shards available. Follows smart 
disenchant rules to determine the amount of shards to spare for upgrading (to 
unlock a champion, or for upgrading champion tokens).

* **Smart disenchant all champion permanents**

Same as above, but with champion permanents.
* **Open all materials, excluding chests**

Will attempt to open all materials available, excluding hextech chests and 
masterwork chests.
* **Upgrade all champion shards by highest tier first**

Will attempt to upgrade all champion shards by their highest tier first. If 
there is insufficient blue essence for the upgrade, the action will immediately 
exit.
* **Upgrade all champion shards by lowest tier first**

Same as above, but by their lowest tier first.

## Loot navigation bar
![image](https://user-images.githubusercontent.com/87099578/172738740-30c26a42-b20b-4cd2-9640-9258e5ff5502.png)

A row of navigation buttons can be found in the left section of the Home view.
Each button will navigate the Loot view based on the loot category displayed. 
From left to right:
* All (includes all of the below categories)
* Materials
* Champions
* Skins
* Tacticians
* Eternals
* Emotes
* Ward Skins
* Summoner Icons

By default, the All category will used for navigation.
## Traditional hextech crafting (for the poor angy kitties)
Hextech crafting that is similar to that of the League client is done in the 
Loot view of Home. Each loot item can be left clicked to display a crafting 
context menu. The following actions can be done based on the action type of the 
loot item:
* Single craft
* Multiple craft (1... maximum count)
* All craft (maximum count)

By default, a warning confirmation prompt will be displayed when attempting to 
craft multiple or all items at once. This warning can be turned off in the 
Settings view.

Items upon successful craft will be displayed in the **Crafted** panel.

## Hextech status
![image](https://user-images.githubusercontent.com/87099578/172738340-bd43cc2b-fcac-4a17-9f89-9a0494ebd336.png)

Needlework will help to assist in calculating the total value of your loot 
before you even craft. Shards, permanents, or skins, don't worry. The possible 
disenchant value and the summation total of your blue essence and orange 
essence are displayed for your convenience and joy! :hype_kitty:

The total amount of capsules are also displayed, which can be found below the 
mythic essence counter.

## Crafted panel
When Needlework successfully crafts loot items, the leftover crafted items will 
be displayed in this panel. This includes the loot item that was used for 
crafting, and the added items after.

This panel can be expanded vertically via the expand button on the left. The 
temporary crafted history can be cleared via the clear button on the right.

## Summoner card
![image](https://user-images.githubusercontent.com/87099578/172738004-2211d0fc-c795-43e0-8534-0b3db95a6b06.png)

Your current summoner information is displayed in this card for quick reference 
purposes. The next level reward is shown here if you're unsure what you might 
get (1-30 rewards, borders, the no-name glorious champion capsules with mythic 
essence, etc).

## Tray icon and notification balloons
![image](https://user-images.githubusercontent.com/87099578/172743048-4782cf19-9d75-4dfc-8416-d2e867811bf3.png)

Needlework will minimize to the tray when using the window 'X' button. To quit, 
right click the tray icon and click 'Quit' to exit the application.

Notification balloons will also be displayed when Needlework drops/establishes 
connection with the League client.

# FAQ
## Smart disenchant rules
1. Is the champion owned? If not, spare three for future use and skip to 5.
2. Is there a champion mastery entry for the champion? If not, spare two for 
future use and skip to 5.
3. Is the champion mastery level less or equal to five? If so, spare two for 
future use and skip to 5.
4. Is the champion mastery level equal to six? If so, spare one and continue. 
If not, spare none and continue.
5. If the difference of the shard/permanent count and spare count is greater 
than zero, disenchant based on the difference value.
## General
**Does Needlework use Overwolf?**  
Nope. (´｡• ω •｡`)

**Can I use Needlework without opening the League of Legends client?**  
Nope. Needlework requires the League of Legends client to be open as it needs to
call the server within (in simple terms). Opening Needlework without an 
open client or closing the client while Needlework is open will give you a very 
sad bee. :c

**Why do I get a page with a sad bee?**  
Needlework was unable to connect with the server of the League of Legends 
client, likely to the reason explained in the above question. u.u

**Am I able to switch accounts while leaving Needlework open?**  
Yes you can! :excited_kitten:

**:bee_happy:?**  
:bee_happy: :bee_happy: :bee_happy: :bee_happy: :bee_happy: :bee_happy: 

## Development

**What framework is used for developing Needlework?**  
Needlework is developed using Vue.js 3 and Electron through nklayman's Vue CLI 
Electron Builder. TypeScript is the primary programming language used for 
processing. More related information can be found in package.json.

**Why was Electron used?**  
I used Electron because, in my opinion (sorry T.T), it is the easiest desktop 
application framework to pick up for my skill set. (Easier development, 
shorter roadblocks, yay!) If this is still an issue, then I'm sorry for being a 
lazy and incompetent developer. :sad_kitten:

# Developers
Clone this git repository to your local environment. Make sure you have yarn 
installed, then do:
```
yarn install
```

Serve, build, unit test, and format commands are listed below:
```
yarn electron:serve
```
```
yarn electron:build
```
```
yarn test
```
```
yarn format
```
