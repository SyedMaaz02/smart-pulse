export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          company_name: string;
          logo_url: string | null;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          company_name: string;
          logo_url?: string | null;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      clients: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          email: string;
          phone: string | null;
          total_billed: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          email: string;
          phone?: string | null;
          total_billed?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["clients"]["Insert"]>;
      };
      invoices: {
        Row: {
          id: number;
          user_id: string;
          client_id: string;
          amount: number;
          status: "draft" | "sent" | "paid";
          due_date: string;
          line_items: Json;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          user_id: string;
          client_id: string;
          amount: number;
          status?: "draft" | "sent" | "paid";
          due_date: string;
          line_items?: Json;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["invoices"]["Insert"]>;
      };
      ai_conversations: {
        Row: {
          id: string;
          user_id: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          message: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          conversation_id: string;
          role: "user" | "assistant" | "system";
          message: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["ai_conversations"]["Insert"]>;
      };
    };
  };
};
