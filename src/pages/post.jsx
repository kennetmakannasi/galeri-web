import React, { useState } from "react";

export default function AddPostModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "#111", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {/* Tombol buka modal */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          padding: "10px 20px",
          background: "#2563eb",
          color: "#fff",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer"
        }}
      >
        Add Post
      </button>

      {/* Modal */}
      {isOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 50
        }}>
          <div style={{
            background: "#2c2c2c",
            padding: "20px",
            borderRadius: "16px",
            maxWidth: "800px",
            width: "100%",
            display: "flex",
            gap: "16px",
            position: "relative"
          }}>
            {/* Upload Box */}
            <div style={{
              flex: 1,
              background: "#3b3b3b",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              color: "white"
            }}>
              <div style={{ fontSize: "40px" }}>⬆️</div>
              <p>Select a file or drag and drop it here</p>
              <small style={{ opacity: 0.7 }}>
                Use high-quality .jpg files &lt; 20MB or .mp4 files &lt; 200MB.
              </small>
            </div>

            {/* Form */}
            <div style={{
              flex: 1,
              background: "#4b4b4b",
              borderRadius: "12px",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              color: "white"
            }}>
              <input
                type="text"
                placeholder="Add Title"
                style={{
                  background: "transparent",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "white"
                }}
              />
              <textarea
                placeholder="Add caption"
                style={{
                  background: "transparent",
                  border: "1px solid gray",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "white",
                  height: "100px"
                }}
              ></textarea>
              <button style={{
                padding: "8px",
                background: "#2563eb",
                borderRadius: "8px",
                color: "white",
                border: "none"
              }}>
                Post
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "20px",
                background: "transparent",
                border: "none",
                color: "white",
                cursor: "pointer"
              }}
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
