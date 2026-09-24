(() => {
  const canvases = document.querySelectorAll("[data-collage]");

  canvases.forEach((canvas) => {
    if (canvas.dataset.collage === "making") {
      setupMakingBlank(canvas);
      return;
    }

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

  function setupMakingBlank(canvas) {
    const workspace = canvas.closest(".collage-workspace-making");
    if (!workspace) {
      return;
    }

    canvas.querySelectorAll(".making-piece").forEach((piece) => {
      piece.tabIndex = 0;
      piece.setAttribute("role", "button");
    });

    setMakingBlank(workspace, canvas, false);

    canvas.addEventListener("click", (event) => {
      if (workspace.classList.contains("is-blank")) {
        setMakingBlank(workspace, canvas, false);
        return;
      }

      const piece = event.target.closest(".making-piece");
      if (!piece || !canvas.contains(piece)) {
        return;
      }

      setMakingBlank(workspace, canvas, true);
    });

    canvas.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      if (workspace.classList.contains("is-blank")) {
        event.preventDefault();
        setMakingBlank(workspace, canvas, false);
        return;
      }

      const piece = event.target.closest(".making-piece");
      if (!piece) {
        return;
      }

      event.preventDefault();
      setMakingBlank(workspace, canvas, true);
    });
  }

  function setMakingBlank(workspace, canvas, showBlank) {
    workspace.classList.toggle("is-blank", showBlank);
    canvas.setAttribute("aria-pressed", showBlank ? "true" : "false");

    const blank = canvas.querySelector(".making-blank");
    if (blank) {
      blank.tabIndex = showBlank ? 0 : -1;
      if (showBlank) {
        blank.focus();
      }
    }

    canvas.querySelectorAll(".making-piece").forEach((piece) => {
      piece.setAttribute(
        "aria-label",
        showBlank
          ? "Reality. Click to show the Making collage."
          : "Expectation. Click to show reality."
      );
    });
  }
})();
