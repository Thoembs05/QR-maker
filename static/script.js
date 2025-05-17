// Handles QR code generation and rendering
function generateQR() {
    const input = document.getElementById('qr-input').value;
    const qrDiv = document.getElementById('qrcode');
    qrDiv.innerHTML = '';
    if (input.trim() !== '') {
        fetch('/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input })
        })
        .then(response => {
            if (!response.ok) throw new Error('Failed to generate QR code');
            return response.blob();
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const img = document.createElement('img');
            img.src = url;
            img.alt = 'QR Code';
            img.width = 256;
            qrDiv.appendChild(img);
            // Add download button
            const downloadBtn = document.createElement('a');
            downloadBtn.href = url;
            downloadBtn.download = 'qrcode.png';
            downloadBtn.textContent = 'Download QR Code';
            downloadBtn.className = 'download-btn';
            qrDiv.appendChild(document.createElement('br'));
            qrDiv.appendChild(downloadBtn);
        })
        .catch(() => {
            qrDiv.textContent = 'Error generating QR code.';
        });
    }
}
