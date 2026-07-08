     function closeNavigation() {
      var x = document.querySelector(".sidebar");
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
        function openNavigation() {
      var x = document.querySelector(".sidebar");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
    }