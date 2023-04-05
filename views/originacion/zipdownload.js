  function downloadZip() {
    // Crea una nueva instancia de JSZip
    var zip = new JSZip();

    // Agrega archivos al ZIP, por ejemplo:
    zip.file("nebraska-drivers-license.pdf", "images\nebraska-drivers-license.pdf");

    // Obtén el archivo desde la carpeta images utilizando fetch o XMLHttpRequest
    fetch("images\nebraska-drivers-license.pdf") // O utiliza XMLHttpRequest si prefieres
      .then(function(response) {
        return response.blob();
      })
      .then(function(blob) {
        zip.file("images\nebraska-drivers-license.pdf", blob); // Agrega el archivo al ZIP
      })
      .then(function() {
        // Genera el archivo ZIP
        zip.generateAsync({type:"blob"}).then(function(content) {
            // Crea un objeto URL para el archivo ZIP
            var url = URL.createObjectURL(content);

            // Crea un enlace para descargar el archivo ZIP
            var link = document.createElement('a');
            link.href = url;
            link.download = 'mi_carpeta.zip';

            // Agrega el enlace al documento y haz clic en él para descargar el archivo ZIP
            document.body.appendChild(link);
            link.click();

            // Elimina el objeto URL y el enlace del documento
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
      })
      .catch(function(error) {
        console.error("Error al agregar el archivo al ZIP:", error);
      });
  }