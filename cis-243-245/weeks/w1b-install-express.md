<h2 style="margin: 20px 0 20px 0; width: 100%; height: 48px; text-align: center; line-height: 200%; font-size: x-large; background-color: #004d71; color: #ffffff;"><strong>Week 2 Readings &amp; Other Materials: HTML no-markdown</strong></h2>
<div style="padding: 0px 10px 10px 10px; border: solid #ccc 1px; overflow: hidden;">
    <h3 style="margin: 20px 0px; border-bottom: 5px solid #d9d9d9;"><span style="font-size: 14pt;"><strong>Read</strong></span></h3>
    <h1 id="installing">Installing</h1>
    <p>Assuming you&rsquo;ve already installed<span>&nbsp;</span><a href="https://nodejs.org/">Node.js</a>, create a directory to hold your application, and make that your working directory.</p>
    <ul>
        <li><a href="https://expressjs.com/en/4x/api.html">Express 4.x</a><span>&nbsp;</span>requires Node.js 0.10 or higher.</li>
        <li><a href="https://expressjs.com/en/5x/api.html">Express 5.x</a><span>&nbsp;</span>requires Node.js 18 or higher.</li>
    </ul>
    <div class="language-bash highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code><span class="nv">$ </span><span class="nb">mkdir </span>myapp
<span class="nv">$ </span><span class="nb">cd </span>myapp
</code></pre>
        </div>
    </div>
    <p>Use the<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">npm init</code><span>&nbsp;</span>command to create a<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">package.json</code><span>&nbsp;</span>file for your application. For more information on how<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">package.json</code><span>&nbsp;</span>works, see<span>&nbsp;</span><a href="https://docs.npmjs.com/files/package.json">Specifics of npm&rsquo;s package.json handling</a>.</p>
    <div class="language-bash highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code><span class="nv">$ </span>npm init
</code></pre>
        </div>
    </div>
    <p>This command prompts you for a number of things, such as the name and version of your application. For now, you can simply hit RETURN to accept the defaults for most of them, with the following exception:</p>
    <div class="language-plaintext highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code>entry point: (index.js)
</code></pre>
        </div>
    </div>
    <p>Enter<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">app.js</code>, or whatever you want the name of the main file to be. If you want it to be<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">index.js</code>, hit RETURN to accept the suggested default file name.</p>
    <p>Now, install Express in the<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">myapp</code><span>&nbsp;</span>directory and save it in the dependencies list. For example:</p>
    <div class="language-bash highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code><span class="nv">$ </span>npm <span class="nb">install </span>express
</code></pre>
        </div>
    </div>
    <p>To install Express temporarily and not add it to the dependencies list:</p>
    <div class="language-bash highlighter-rouge">
        <div class="highlight">
            <pre class="highlight"><code><span class="nv">$ </span>npm <span class="nb">install </span>express <span class="nt">--no-save</span>
</code></pre>
        </div>
    </div>
    <div class="doc-box doc-info">
        <p>By default with version npm 5.0+,<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">npm install</code><span>&nbsp;</span>adds the module to the<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">dependencies</code><span>&nbsp;</span>list in the<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">package.json</code><span>&nbsp;</span>file; with earlier versions of npm, you must specify the<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">--save</code><span>&nbsp;</span>option explicitly. Then, afterwards, running<span>&nbsp;</span><code class="language-plaintext highlighter-rouge">npm install</code><span>&nbsp;</span>in the app directory will automatically install modules in the dependencies list.</p>
    </div>
    <h3 style="margin: 20px 0px; border-bottom: 5px solid #d9d9d9;"><span style="font-size: 14pt;"><strong>Read</strong></span></h3>
    <ul>
        <li>Ensure your Verdaccio server is running</li>
        <li>make a folder with: <code>$ mkdir myExpress-Date</code></li>
        <li>navigate to your folder and run: <code>$ npm init -y</code></li>
        <li>add <code>"type":"module"</code> to your package.json</li>
        <li>run <code>$ npm install</code> for
            <ul>
                <li>express</li>
                <li>nodemon</li>
                <li>morgan (optional)</li>
            </ul>
        </li>
        <li>create an index.js and make your server</li>
        <li>Add start Scripts
            <div>
                <p style="font: 'red';">If using nodemon, add a start script to your package.json</p>
                <pre style="width: 100%; height: auto; text-align: left; line-height: 200%; background-color: #efe;">"scripts": {
    "start": "nodemon index.js",
},</pre>
                <p>If not using nodemon</p>
                <pre style="width: 100%; height: auto; text-align: left; line-height: 200%; background-color: #eee;">"scripts": {
    "start": "node index.js",
},</pre>
            </div>
        </li>
    </ul>
    <div>
        <p>If you cannot install morgan, or want more control over what you see in the console, place the following code below your exports and above the routes in your index.js file.</p>
        <pre style="width: 100%; height: auto; text-align: left; line-height: 200%; background-color: #eee;">//log function that replicates morgan
function log(request, response, next){
    console.log(request.url);
    next();
};
app.use(log)
</pre>
    </div>
    <div>
        <h3>The most basic express server</h3>
        <pre style="width: 100%; height: auto; text-align: left; line-height: 200%; background-color: #eee;">import express from 'express'; 
const PORT = 3000;
const app = express()
app.get('/',(request, response) =&gt; {<br />   res.send('hello World')<br />});
app.listen(PORT, () =&gt; {<br />   console.log(`listening on port ${PORT}`)<br />});</pre>
    </div>
    <div>
        <p>The most basic express server with logging middleware (morgan replacement)</p>
        <pre style="width: 100%; height: auto; text-align: left; line-height: 200%; background-color: #eee;">import express from 'express'; 
const PORT = 3000;
const app = express();
function log(request, response, next){
    console.log(request.url);
    next();
};
app.use(log);
app.get('/',(request, response) =&gt; {<br />   res.send('hello World')<br />});
app.listen(PORT, () =&gt; {<br />   console.log(`listening on port ${PORT}`)<br />});</pre>
    </div>
    <p>&nbsp;</p>
    <h3 style="margin: 20px 0px; border-bottom: 5px solid #d9d9d9;"><span style="font-size: 14pt;"><strong>Watch</strong></span></h3>
    <h3 style="margin: 20px 0px; border-bottom: 5px solid #d9d9d9;"><span style="font-size: 14pt;"><strong>Explore</strong></span></h3>
    <ul>
        <li>Explore: <a href="https://fakerjs.dev/">https://fakerjs.dev/</a></li>
        <li>Explore: <a href="https://fakerjs.dev/api/">https://fakerjs.dev/api/</a></li>
        <li>Explore:<a href="https://expressjs.com"> https://expressjs.com</a></li>
        <li>Explore: <a href="https://expressjs.com/en/starter/hello-world.html">https://expressjs.com/en/starter/hello-world.html</a></li>
        <li><a class="inline_disabled" href="https://expressjs.com/en/starter/basic-routing.html" target="_blank" rel="noopener">https://expressjs.com/en/starter/basic-routing.html</a></li>
        <li><a class="inline_disabled" href="https://expressjs.com/en/guide/routing.html" target="_blank" rel="noopener">https://expressjs.com/en/guide/routing.html</a></li>
    </ul>
    <h3 style="margin: 20px 0px; border-bottom: 5px solid #d9d9d9;"><span style="font-size: 14pt;"><strong>Listen</strong></span></h3>
    <p>&nbsp;</p>
</div>
<div style="border-bottom: 10px solid #004d71; font-size: 8px; margin-bottom: 20px;">&nbsp;</div>