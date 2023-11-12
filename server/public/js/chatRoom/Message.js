function sendMessage() {
  const input = document.getElementById("message-input");
  const inputValue = input.value.trim();
  const imageInput = document.getElementById("image-input");

  if (imageInput.files.length > 0) {
      const formData = new FormData();
      formData.append("image", imageInput.files[0]);

      fetch("/upload", {
          method: "POST",
          body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
          const imageUrl = data.imageUrl;
          socket.emit("sendMessage", {
              roomId: roomId,
              senderName: name,
              body: `<img src="${imageUrl}" alt="Image" width="150">`,
          });
          imageInput.value = ""; // Clear the image input
          input.style.backgroundImage = 'none'; // Remove the image preview
          input.style.height = '40px'; // Reset the height to original size
          document.querySelector('.clear-preview').style.display = 'none'; // Hide the clear preview button
      });
  } else if (inputValue) {
      socket.emit("sendMessage", {
          roomId: roomId,
          senderName: name,
          body: inputValue,
      });
      input.value = ""; // Clear the input field
  } else {
      alert("Sorry, you didn't type anything or attach an image.");
  }
}