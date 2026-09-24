(() => {
  const canvases = document.querySelectorAll("[data-collage]");

  canvases.forEach((canvas) => {
    canvas.querySelectorAll(".pin-cluster .appearance-piece, .pin-cluster .making-piece, .pin-cluster .living-piece").forEach((piece) => {
      piece.tabIndex = 0;
      piece.setAttribute("role", "button");
    });

    canvas.querySelectorAll(".pin-cluster").forEach((cluster) => {
      setClusterState(cluster, false);
    });

    canvas.addEventListener("click", (event) => {
      const piece = event.target.closest(".appearance-piece, .making-piece, .living-piece");
      if (!piece || !canvas.contains(piece)) {
        return;
      }

      const cluster = piece.closest(".pin-cluster");
      if (!cluster || !cluster.querySelector(".piece-reality")) {
        return;
      }

      setClusterState(cluster, !cluster.classList.contains("is-reality"));
    });

    canvas.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const piece = event.target.closest(".appearance-piece, .making-piece, .living-piece");
      if (!piece) {
        return;
      }

      event.preventDefault();
      const cluster = piece.closest(".pin-cluster");
      if (!cluster || !cluster.querySelector(".piece-reality")) {
        return;
      }

      setClusterState(cluster, !cluster.classList.contains("is-reality"));
    });
  });

  function setClusterState(cluster, showReality) {
    cluster.classList.toggle("is-reality", showReality);
    cluster.setAttribute("aria-pressed", showReality ? "true" : "false");

    const name = cluster.dataset.cluster || "this group";
    cluster.querySelectorAll(".appearance-piece, .making-piece, .living-piece").forEach((piece) => {
      const isReality = piece.classList.contains("piece-reality");
      piece.setAttribute(
        "aria-label",
        isReality
          ? `Reality for ${name}. Click to show expectation.`
          : `Expectation for ${name}. Click to show reality.`
      );
    });
  }
})();
