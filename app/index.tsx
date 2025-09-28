import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { api } from "../src/api";

type BotState = "running" | "stopped" | "unknown" | "error";

export default function Dashboard() {
  const [botState, setBotState] = useState<BotState>("unknown");
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<number | undefined>(undefined);

  // <-- KLUCZOWA POPRAWKA TYPU
  const pollerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const loadStatus = useCallback(async () => {
    try {
      const s = await api.status();
      setBotState((s.status as BotState) ?? "unknown");
      setBalance(s.balance);
    } catch {
      setBotState("error");
    }
  }, []);

  useEffect(() => {
    loadStatus();
    if (pollerRef.current) clearInterval(pollerRef.current);
    pollerRef.current = setInterval(loadStatus, 5000);
    return () => {
      if (pollerRef.current) clearInterval(pollerRef.current);
    };
  }, [loadStatus]);

  const start = async () => {
    try {
      setLoading(true);
      await api.startBot();
      await loadStatus();
    } catch (e: any) {
      Alert.alert("Błąd", e.message ?? "Nie udało się uruchomić bota");
    } finally {
      setLoading(false);
    }
  };

  const stop = async () => {
    try {
      setLoading(true);
      await api.stopBot();
      await loadStatus();
    } catch (e: any) {
      Alert.alert("Błąd", e.message ?? "Nie udało się zatrzymać bota");
    } finally {
      setLoading(false);
    }
  };

  const StatusPill = ({ state }: { state: BotState }) => {
    const label =
      state === "running"
        ? "RUNNING"
        : state === "stopped"
          ? "STOPPED"
          : state === "error"
            ? "ERROR"
            : "UNKNOWN";
    const bg =
      state === "running"
        ? "#16a34a"
        : state === "stopped"
          ? "#475569"
          : state === "error"
            ? "#dc2626"
            : "#a78bfa";

    return (
      <View
        style={{
          backgroundColor: bg,
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 999,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700", letterSpacing: 1 }}>
          {label}
        </Text>
      </View>
    );
  };

  const Button = ({
    title,
    onPress,
    variant = "primary",
  }: {
    title: string;
    onPress: () => void;
    variant?: "primary" | "danger";
  }) => (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading}
      style={{
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 4,
        backgroundColor: variant === "danger" ? "#7f1d1d" : "#0f172a",
        opacity: loading ? 0.7 : 1,
      }}
    >
      <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0b1020" }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 24, gap: 18 }}>
        <Text style={{ color: "#e5e7eb", fontSize: 22, fontWeight: "800" }}>
          BlueRose AI – Dashboard
        </Text>

        <View
          style={{
            backgroundColor: "#111634",
            padding: 18,
            borderRadius: 20,
            gap: 12,
          }}
        >
          <Text style={{ color: "#c7d2fe", fontWeight: "700" }}>
            Status bota
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <StatusPill state={botState} />
            {loading ? <ActivityIndicator /> : null}
          </View>
          <Text style={{ color: "#94a3b8" }}>
            Saldo:{" "}
            <Text style={{ color: "#e2e8f0", fontWeight: "700" }}>
              {balance ?? "—"}
            </Text>
          </Text>
          <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
            <View style={{ flex: 1 }}>
              <Button title="START BOT" onPress={start} />
            </View>
            <View style={{ flex: 1 }}>
              <Button title="STOP BOT" onPress={stop} variant="danger" />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={loadStatus}
          disabled={loading}
          style={{
            paddingVertical: 12,
            borderRadius: 12,
            alignItems: "center",
            backgroundColor: "#1f2937",
          }}
        >
          <Text style={{ color: "#cbd5e1", fontWeight: "700" }}>
            Odśwież status
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 1 }} />
        <Text
          style={{ color: "#64748b", textAlign: "center", marginBottom: 20 }}
        >
          v0.1 – lokalne API: http://localhost:8088
        </Text>
      </View>
    </SafeAreaView>
  );
}
