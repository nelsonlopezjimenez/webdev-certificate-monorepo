Let me present the questions directly for you:

# 📝 **HTML Midterm - Written Response Questions**

## **5 Questions (80 points total)**

---

### **Question 1: Semantic HTML (15 points)**

**Explain the difference between semantic and non-semantic HTML elements. Provide at least THREE examples of semantic HTML5 elements and explain why using semantic HTML is important for web development. Address:**
- Accessibility
- SEO (Search Engine Optimization)  
- Code maintainability

**Grading:** Definition (3), Examples (6), Accessibility (2), SEO (2), Maintainability (2)

---

### **Question 2: HTML Forms and Input Types (15 points)**

**You are building a user registration form. List and describe FIVE different HTML5 input types. For each:**
1. What type of data it collects
2. What built-in validation it provides
3. One specific use case in registration

**Example format:** `type="email"` - Collects email addresses, validates format, for user login email

**Grading:** 5 input types (5), Data descriptions (5), Validation/features (5)

---

### **Question 3: Code Debugging ⚠️ (20 points)**

**The following HTML contains MULTIPLE errors. Identify and explain at least SEVEN errors, then provide corrected code:**

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website
    <meta charset="UTF-8">
</head>
<Body>
    <header>
        <h1>Welcome to My Site</h2>
        <nav>
            <ul>
                <li><a href="home.html">Home</a>
                <li><a href="about.html">About</a></li>
                <li><a href="">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <h2>Article Title</h2>
            <img src="photo.jpg" width="500">
            <p>This is a paragraph with <strong>bold text</b> and a 
            <a href="https://example.com" target="_blank">link</a>.</p>
            <br><br><br>
        </article>
        
        <form action="/submit" method="post">
            <input type="text" name="username">
            <input type="submit">
        </form>
    </main>
    
    <footer>
        <p>Copyright 2024
    </footer>
</body>
</html>
```

**Errors include:** Missing closing tags, mismatched tags, capitalization, missing alt attribute, excessive br tags, missing labels, empty href, and more!

**Grading:** Identifying 7 errors (7), Explaining why wrong (7), Corrected code (6)

---

### **Question 4: HTML Accessibility Attributes (15 points)**

**Explain the importance of these HTML attributes for web accessibility:**
- `alt`
- `aria-label`
- `role`

**For each attribute, describe:**
1. Its purpose
2. Which HTML elements commonly use it
3. How it benefits users with disabilities
4. Provide a code example

**Grading:** Purpose (3), Element usage (3), Benefits (6), Code examples (3)

---

### **Question 5: Code Analysis and Improvement ⚠️ (15 points)**

**Analyze this product card code. Identify at least FIVE improvements for best practices, accessibility, and semantic HTML:**

```html
<div class="product-card">
    <div class="product-image">
        <img src="product.jpg" width="300" height="200">
    </div>
    <div class="product-title">
        <span style="font-size: 24px; font-weight: bold;">
            Premium Headphones
        </span>
    </div>
    <div class="product-price">
        <span style="color: red; font-size: 20px;">$99.99</span>
    </div>
    <div class="product-description">
        These headphones are great. They have good sound quality.
        Click here to learn more.
    </div>
    <div>
        <input type="button" value="Add to Cart" onclick="addToCart()">
    </div>
</div>
```

**Look for:** Missing alt text, inline styles, non-semantic elements, vague link text, improper button usage, lack of semantic HTML5 elements

**Grading:** 5 improvements identified (5), Explaining problems (5), How to fix (5)

---

## 📊 **Grading Summary**

| Question | Points | Topic |
|----------|--------|-------|
| Q1 | 15 | Semantic HTML |
| Q2 | 15 | Forms & Input Types |
| Q3 | 20 | Code Debugging ⚠️ |
| Q4 | 15 | Accessibility |
| Q5 | 15 | Code Analysis ⚠️ |
| **Total** | **80** | |

These questions require students to demonstrate deep understanding of HTML fundamentals, best practices, and the ability to identify and fix real-world coding errors! 🎓