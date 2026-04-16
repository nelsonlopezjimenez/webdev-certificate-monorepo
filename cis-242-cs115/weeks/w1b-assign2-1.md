# Assign2-1: Window navigator object challenges

## Geolocation: limitations in a offline environment

### Background information

Geolocation data has to pass through two separate gatekeepers — and both must pass:

---

**Gatekeeper 1 — Browser permission**
The browser asks the user "allow location?" before any coordinates reach your code. This is enforced locally by the browser — **no internet needed**. Once granted, it is cached and works offline.

**Gatekeeper 2 — The actual location lookup**
Even with permission granted, the browser still needs to _resolve_ the location. It does this by sending your Wi-Fi/network data to an external service (Google, Apple, Mozilla location servers). **That requires internet.**

---

## Where DevTools Sensors fits in

Sensors bypass Gatekeeper 2 entirely — it injects coordinates directly, skipping the external lookup. But it **does not bypass Gatekeeper 1** — the permission must still be granted.

```
Permission denied  →  code never runs,  sensors irrelevant
Permission granted →  sensors feed fake coords directly,  no internet needed
```

---

## The offline sequence that works

```
1. Grant permission once (while online or on file://)
2. Go offline
3. Enable DevTools Sensors with fake coordinates
4. Geolocation works — permission cached, lookup bypassed
```

> Short answer: permission is a browser decision made locally. Location lookup is a network call to an external server. Sensors short-circuit the network call but cannot short-circuit the permission gate.

### Challenge 1

Similarly to assign1-1, you will add more navigator properties. Add the following code after "challenge 1:" line

```html
<p id="demo3"></p>
<p id="demo4"></p>
<p id="demo5"></p>
<p id="demo6"></p>
<p id="demo7"></p>
<p id="demo8"></p>
<p id="demo9"></p>
<p id="demo10"></p>
```

### Challenge 2

Add a button to change the font color when clicked. Add the following code after "challenge 2: add font color button " line

```html
<button id="colorBtn">Change Font Color</button>
```

Add changeFontColor function after "challenge 2: changes color of all demo paragraphs to red"

```js
function changeFontColor() {
  alert("You are about to change the color of one of the items below!!!");
  document
    .querySelectorAll('[id^="demo"]')
    .forEach((el) => (el.style.color = "red"));
}

document.getElementById("colorBtn").addEventListener("click", changeFontColor);
```
