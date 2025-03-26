import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

const PokemonDialog = ({ pokemon, onClose }) => {
  return (
    <Dialog.Root open={true} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* ✅ 背景オーバーレイ */}
        <Dialog.Overlay
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
          }}
        />

        {/* ✅ 中央に表示されるモーダル */}
        <Dialog.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            width: "300px",
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
            outline: "none",
          }}
        >
          <Dialog.Title
            style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "8px" }}
          >
            {pokemon.name}
          </Dialog.Title>

          <div style={{ fontSize: "14px", color: "#666", marginBottom: "16px" }}>
            種族値: {pokemon.stats?.join(" / ") || "不明"}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {["S", "A", "B", "C", "D", "E"].map((tierId) => (
              <Button key={tierId} variant="secondary" style={{ width: "100%" }}>
                {tierId}ランクへ追加（仮）
              </Button>
            ))}
            <Button variant="destructive" style={{ width: "100%" }}>
              削除（仮）
            </Button>
          </div>

          <Dialog.Close asChild>
            <Button variant="outline" style={{ marginTop: "16px", width: "100%" }}>
              閉じる
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default PokemonDialog;
