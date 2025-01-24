/**
 * Opens a modal with customizable content and buttons.
 *
 * @param {Object} options - Configuration options for the modal.
 * @param {string} options.title - The modal title.
 * @param {string} options.content - The modal body content.
 * @param {string} [options.confirmText="OK"] - The text for the confirm button.
 * @param {string} [options.cancelText] - The text for the cancel button (if omitted, no cancel button will show).
 * @param {Function} [options.onConfirm] - Callback when the confirm button is clicked.
 */
export function openModal({
  title,
  content,
  confirmText = "OK",
  cancelText,
  onConfirm,
}) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalContent = document.getElementById("modal-content");
  const confirmButton = document.getElementById("modal-confirm");
  const cancelButton = document.getElementById("modal-cancel");

  modalTitle.textContent = title;
  modalContent.textContent = content;
  confirmButton.textContent = confirmText;

  if (cancelText) {
    cancelButton.textContent = cancelText;
    cancelButton.classList.remove("hidden");
  } else {
    cancelButton.classList.add("hidden");
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");

  confirmButton.onclick = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  cancelButton.onclick = closeModal;

  window.onclick = (event) => {
    if (event.target === modal) closeModal();
  };
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

