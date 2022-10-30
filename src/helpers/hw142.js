let count = 0;

const CLASS_SUCCESS = "text-success";
const CLASS_DANGER = "text-danger";

export function validateEnergy(value, max = 100) {
  if (value < 0) {
    throw new Error("New energy level can not be less than 0");
  }

  if (value > max) {
    throw new Error(`New energy level can not be more than ${max}.`);
  }
}

export function showInfo(textContent, messageBlock, className = CLASS_SUCCESS) {
  const infoBlock = document.createElement("p");
  infoBlock.className = className;
  infoBlock.textContent = textContent;
  messageBlock.appendChild(infoBlock);
}

export function execute(callback, messageBlock) {
  try {
    callback();
  } catch (error) {
    showInfo(
      `[${count++}] ${error.name}: ${error.message}`,
      messageBlock,
      CLASS_DANGER
    );
  }
}
