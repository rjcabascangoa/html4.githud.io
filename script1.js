
<html lang="en">
<head>
 <title>Ejemplo JavaScript</title>
</head>
<body>
 <h1 id="titulo">Hola, Mundo</h1>
 <button onclick="cambiarTexto()">Haz clic aquí</button>
 <script>
 function cambiarTexto() {
 document.getElementById("titulo").innerText = "¡Texto cambiado con
JavaScript!";
 }
 </script>
</body>
</html>