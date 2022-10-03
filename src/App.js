import { useState } from "react";
import "./styles.css";

export default function App() {
    const [result, setResult] = useState("");
    const renderBotList = (idx, name, webhook, messageId, wordList, doorId) => {
        return `
      Bot["${name.toUpperCase()}"] = {
        slot = ${idx}, -- Bot slot info in webhook
        webhookLink = "${webhook}", -- Bot webhook link
        messageId = "${messageId}", -- Webhook message id
        startFrom = 1, -- Start from in world list
        worldList = ${wordList}, -- World list
        doorFarm = "${doorId}", -- Rotation world door id
        upgradeBackpack = 0 -- Number of times to upgrade backpack when starting rotation
      }
    `;
    };

    const submitList = (rs) => {
        let arr = [];

        if (result === "") return;

        rs.forEach((r, idx) => {
            const final = r.split("\n");
            arr.push(
                renderBotList(idx + 1, final[0], final[1], final[2], final[3], final[4])
            );
        });
        return arr.join("");
    };

    const end = submitList(result?.split(/\n\s*\n/));

    return (
        <div>
            <h1>Convert Bot List</h1>
            <div style={{ marginBottom: "12px" }}>
                Template:
                <br />
                SkyCrapper4355
                <br />
                https://discord.webhook/your-webhook-url
                <br />
                98723111928374
                <br />
                {'{"HHRKL","RPLEP","RGCTT","MWDTP"}'}
                <br />
                DOORKEY322
            </div>
            <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
                <textarea onChange={(e) => setResult(e.target.value)} rows={10}>
                    {result}
                </textarea>
                <button
                    onClick={() => {
                        navigator.clipboard.writeText(end);
                    }}
                    style={{ marginTop: "2em", padding: "1em", display: "" }}
                >
                    Copy to Clipboard
                </button>
            </div>
            <div style={{ marginTop: "21px" }}>
                <label>Preview:</label>
                <pre>{end}</pre>
            </div>
        </div>
    );
}
