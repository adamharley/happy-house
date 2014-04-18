Happy House
===========
<p>Happy House is the creation of <a href="http://web.archive.org/web/20070611110628/http://www.eggegg.co.jp/~tango/tyhp/halmis_work/halmi.html" target="_blank">Halmi Arai</a>, dedicated to the memory of her beloved hamster Ruby Springfield.</p>
<p>It was originally made in <a href="https://en.wikipedia.org/wiki/Adobe_Director" target="_blank">Macromedia Director 7</a> for Windows 95 and Mac OS.</p>
<p>As it can't be run under a modern OS, I decided to decompile it and recreate Happy House using HTML, CSS and jQuery.</p>
<p>What you see here is as close as I could get, using the original frame data but estimated probabilities for changes in behaviour.</p>
<p><strong>What does it do?</strong></p>
<blockquote>In the words of lifelong hamster lover M. Yoshida, "people who like hamsters will know what to expect". In other words, Happy House doesn't do much.<br />&ndash; <a href="http://www.maniform.com/stuff/hamster.htm" target="_blank">Maniform Creative Services</a></blockquote>
<p>You can...</p>
<ul>
<li>Open/close the basket</li>
<li>Feed Ruby</li>
<li>Gain Ruby's attention</li>
<li>Watch Ruby do her thing</li>
</ul>
<p><strong>Technical Info</strong></p>
<ul>
<li>The original .exe is a Macromedia Director Projector, packed in a self-extracting archive</li>
<li>The Director file can be extracted using <a href="http://www.buraks.com/swifty/" target="_blank">Swifty Xena Pro</a> and protection removed with <a href="http://oastone.com/blog/?tag=/diropener" target="_blank">dirOpener</a></li>
<li>Image assets can be extracted using <a href="http://valentin.dasdeck.com/xtras/img_xtra/" target="_blank">ImgXtra</a> and <a href="http://forums.adobe.com/message/2766085#2766085" target="_blank">this Lingo script</a></li>
<li>Audio assets can be extracted using <a href="http://xtras.tabuleiro.com/download/audio.htm" target="_blank">AudioXtra</a> and <a href="http://forums.adobe.com/message/867206#867206" target="_blank">this Lingo script</a></li>
<li>Script assets cannot be recovered as they're compiled</li>
<li>The Score can be extracted using Lingo</li>
<li>This version of Happy House stores the frames in a JSON array and iterates over them using JavaScript substitutes for the original scene scripts</li>
<li>The source code for this version can be found <a href="https://github.com/adamharley/happy-house" target="_blank">here</a></li>
</ul>
