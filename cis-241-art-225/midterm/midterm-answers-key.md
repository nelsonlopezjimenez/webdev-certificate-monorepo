# 📚 **HTML Midterm - Answer Key**
## Brief Sample Responses for Students

---

## **Question 1: Semantic HTML ✓**

### **Sample Answer:**

**Three Semantic Elements:**

  <!-- === SOLUTION START === -->

1. **`<header>`** - Contains intro content/navigation for page or section
2. **`<nav>`** - Contains navigation links for the website
3. **`<article>`** - Self-contained content like blog posts or news articles

**Why Important:**
- **Accessibility:** Screen readers navigate by semantic elements (users can jump to nav, main content, etc.)
- **SEO:** Search engines understand `<article>` is important content vs a `<div>`
- **Maintainability:** Clear code structure - `<nav>` is clearer than `<div class="navigation">`

---
  <!-- === SOLUTION END === -->
## **Question 2: Input Types ✓**

1. **`type="email"`** → Email addresses | Validates @ symbol | Login email
  <!-- === SOLUTION START === -->
2. **`type="password"`** → Hidden text | Hides characters (•••) | Account password
3. **`type="date"`** → Dates | Date picker widget | Date of birth
4. **`type="tel"`** → Phone numbers | Mobile numeric keyboard | Contact number
5. **`type="checkbox"`** → Boolean | Can be required | "I agree to terms"

---
  <!-- === SOLUTION END === -->
## **Question 3: The 10 Errors ⚠️**

1. ❌ `<title>My Website` → ✅ `<title>My Website</title>`
2. ❌ `<Body>` → ✅ `<body>` (lowercase)
3. ❌ `<h1>...</h2>` → ✅ `<h1>...</h1>` (matching tags)
4. ❌ `<li><a...>Home</a>` → ✅ `<li><a...>Home</a></li>` (close li)
5. ❌ `href=""` → ✅ `href="contact.html"` (valid URL)
6. ❌ `<img src="photo.jpg">` → ✅ Add `alt="Description"`
7. ❌ `<strong>...</b>` → ✅ `<strong>...</strong>` (matching)
8. ❌ `<br><br><br>` → ✅ Use CSS margin instead
9. ❌ Input without label → ✅ `<label for="username">Username:</label>`
10. ❌ `<p>Copyright 2024` → ✅ `<p>Copyright 2024</p>`

---

## **Question 4: Accessibility Attributes  ✓**

**Aria**: Accessible Rich Internet Aplication
  <!-- === SOLUTION START === -->

### **1. `alt` Attribute**
- **Purpose:** Alternative text for images
- **Elements:** `<img>`, `<area>`, `<input type="image">`
- **Benefits:** Screen readers read it aloud; shows if image fails to load
- **Example:** `<img src="logo.png" alt="Company Logo">`

### **2. `aria-label` Attribute**
- **Purpose:** Accessible label when no visible text
- **Elements:** `<button>`, `<a>`, `<nav>`, any interactive element
- **Benefits:** Screen readers announce the label; great for icon buttons
- **Example:** `<button aria-label="Close"><span>×</span></button>`

### **3. `role` Attribute**
- **Purpose:** Defines element's purpose for screen readers
- **Elements:** `<div>`, `<span>`, custom widgets
- **Benefits:** Makes non-semantic elements meaningful
- **Example:** `<div role="navigation">` or `<button role="tab">`

---
  <!-- === SOLUTION END === -->
## **Question 5: Five Improvements ✓**

  <!-- === SOLUTION START === -->
### **The Problems:**

1. **Missing alt:** `<img src="product.jpg">` 
   - Fix: `<img src="product.jpg" alt="Premium headphones">`

2. **Inline styles:** `style="font-size: 24px; font-weight: bold;"`
   - Fix: Use CSS classes in external stylesheet

3. **Non-semantic title:** `<span>Premium Headphones</span>`
   - Fix: `<h2>Premium Headphones</h2>`

4. **Vague link:** "Click here to learn more"
   - Fix: `<a href="details.html">Learn more about Premium Headphones</a>`

5. **Wrong button type:** `<input type="button" onclick="...">`
   - Fix: `<button type="button">Add to Cart</button>` (JS in separate file)

**Bonus:** Generic `<div>` everywhere → Use `<article>`, `<figure>`

### **Improved Version:**
```html
<article class="product-card">
    <figure>
        <img src="product.jpg" alt="Premium wireless headphones">
    </figure>
    <h2>Premium Headphones</h2>
    <p class="price">$99.99</p>
    <p>Great sound quality. 
       <a href="details.html">Learn more about Premium Headphones</a>
    </p>
    <button type="button">Add to Cart</button>
</article>
```
  <!-- === SOLUTION END === -->
---

## **🎯 Common Student Mistakes:**

| Question | Common Error |
|----------|-------------|
| Q1 | Only listing elements without explaining WHY semantic HTML matters |
| Q2 | Not explaining validation features of each input type |
| Q3 | Finding only 3-4 errors when there are **10 total**! |
| Q4 | Forgetting to provide actual code examples |
| Q5 | Identifying problems but not showing HOW to fix them |

---

## **📊 Quick Grading Reference:**

- **Q1 (15 pts):** 3 examples (6), why important (9)
- **Q2 (14 pts):** 5 input types with all 3 parts each
- **Q3 (10 pts):** 7+ errors identified and fixed with corrected code
- **Q4 (10 pts):** All 3 attributes with purpose, elements, benefits, examples
- **Q5 (1 pts):** 5+ improvements with problem + solution

**Total: 50 points**

This answer key shows students **exactly** what was expected so they can learn from any questions they missed! 📝✅