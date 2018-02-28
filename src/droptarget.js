export default function(holder, dropCallback) {
  holder.ondragenter = function() {
    holder.classList.add("drophover");
    return false;
  };
  holder.ondragover = function() {
    return false;
  };
  holder.ondragend = function() {
    return false;
  };
  holder.ondragleave = function(e) {
    if (e.target.id !== "dropoverlay") {
      return;
    }
    holder.classList.remove("drophover");
    return false;
  };

  holder.ondrop = function(e) {
    e.preventDefault();

    holder.classList.remove("drophover");

    var file = e.dataTransfer.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
      var img = document.createElement("img");
      img.src = event.target.result;
      img.addEventListener("load", dropCallback.bind(this, img));
    };

    reader.readAsDataURL(file);

    return false;
  };
}
