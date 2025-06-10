-- INVOIFIX Database Schema for Supabase
-- Execute this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_type TEXT NOT NULL CHECK (client_type IN ('Empresa', 'Particular', 'Freelancer')),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    avatar_url TEXT,
    company_name TEXT,
    tax_id TEXT,
    address_street TEXT,
    address_city TEXT,
    address_state TEXT,
    address_postal_code TEXT,
    address_country TEXT,
    website TEXT,
    business_type TEXT,
    origin TEXT,
    internal_notes TEXT,
    status TEXT NOT NULL DEFAULT 'Activo' CHECK (status IN ('Activo', 'Inactivo', 'Con Deuda')),
    total_billed DECIMAL(10,2) DEFAULT 0,
    pending_balance DECIMAL(10,2) DEFAULT 0,
    ai_profile_summary TEXT,
    ai_opportunities TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    role TEXT NOT NULL DEFAULT 'Client' CHECK (role IN ('Administrator', 'Billing', 'Technician', 'Client', 'Scrum', 'Project Leader', 'Programmer', 'QA')),
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    invoice_number TEXT NOT NULL UNIQUE,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    due_date DATE NOT NULL,
    issued_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create invoice_items table
CREATE TABLE IF NOT EXISTS invoice_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    invoice_id UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    ticket_number TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Review', 'In Progress', 'Resolved', 'Closed')),
    priority TEXT NOT NULL DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    submitted_by TEXT NOT NULL,
    client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_documents table
CREATE TABLE IF NOT EXISTS client_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    size INTEGER NOT NULL,
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create client_projects table
CREATE TABLE IF NOT EXISTS client_projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    client_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
    project_name TEXT NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status TEXT NOT NULL DEFAULT 'Active' CHECK (status IN ('Active', 'Completed', 'On Hold', 'Cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON clients(created_at);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due_date ON invoices(due_date);
CREATE INDEX IF NOT EXISTS idx_invoices_created_at ON invoices(created_at);

CREATE INDEX IF NOT EXISTS idx_invoice_items_invoice_id ON invoice_items(invoice_id);

CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_assigned_to ON tickets(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tickets_client_id ON tickets(client_id);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at);

CREATE INDEX IF NOT EXISTS idx_client_documents_client_id ON client_documents(client_id);
CREATE INDEX IF NOT EXISTS idx_client_projects_client_id ON client_projects(client_id);

-- Create functions for automatic updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON clients
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tickets_updated_at BEFORE UPDATE ON tickets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_projects_updated_at BEFORE UPDATE ON client_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_projects ENABLE ROW LEVEL SECURITY;

-- Create policies (adjust based on your authentication needs)
-- For now, allow all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON clients
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON users
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON invoices
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON invoice_items
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON tickets
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON client_documents
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow all operations for authenticated users" ON client_projects
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data (optional)
INSERT INTO users (name, email, role) VALUES
    ('Admin User', 'admin@invoifix.com', 'Administrator'),
    ('John Technician', 'john@invoifix.com', 'Technician'),
    ('Jane Billing', 'jane@invoifix.com', 'Billing')
ON CONFLICT (email) DO NOTHING;

INSERT INTO clients (client_type, first_name, last_name, email, phone, company_name) VALUES
    ('Empresa', 'Carlos', 'Rodriguez', 'carlos@empresa.com', '+1234567890', 'Empresa Tech'),
    ('Particular', 'Maria', 'Garcia', 'maria@email.com', '+0987654321', NULL),
    ('Freelancer', 'Luis', 'Martinez', 'luis@freelancer.com', '+1122334455', 'Luis Design Studio')
ON CONFLICT (email) DO NOTHING;

-- Create a view for client statistics
CREATE OR REPLACE VIEW client_stats AS
SELECT 
    COUNT(*) as total_clients,
    COUNT(CASE WHEN status = 'Activo' THEN 1 END) as active_clients,
    COUNT(CASE WHEN status = 'Inactivo' THEN 1 END) as inactive_clients,
    COUNT(CASE WHEN status = 'Con Deuda' THEN 1 END) as clients_with_debt,
    SUM(total_billed) as total_revenue,
    SUM(pending_balance) as total_pending
FROM clients;

-- Create a view for invoice statistics
CREATE OR REPLACE VIEW invoice_stats AS
SELECT 
    COUNT(*) as total_invoices,
    COUNT(CASE WHEN status = 'Draft' THEN 1 END) as draft_invoices,
    COUNT(CASE WHEN status = 'Sent' THEN 1 END) as sent_invoices,
    COUNT(CASE WHEN status = 'Paid' THEN 1 END) as paid_invoices,
    COUNT(CASE WHEN status = 'Overdue' THEN 1 END) as overdue_invoices,
    SUM(amount) as total_amount,
    SUM(CASE WHEN status = 'Paid' THEN amount ELSE 0 END) as paid_amount,
    SUM(CASE WHEN status IN ('Sent', 'Overdue') THEN amount ELSE 0 END) as pending_amount
FROM invoices;

-- Create a view for ticket statistics
CREATE OR REPLACE VIEW ticket_stats AS
SELECT 
    COUNT(*) as total_tickets,
    COUNT(CASE WHEN status = 'New' THEN 1 END) as new_tickets,
    COUNT(CASE WHEN status = 'In Review' THEN 1 END) as in_review_tickets,
    COUNT(CASE WHEN status = 'In Progress' THEN 1 END) as in_progress_tickets,
    COUNT(CASE WHEN status = 'Resolved' THEN 1 END) as resolved_tickets,
    COUNT(CASE WHEN status = 'Closed' THEN 1 END) as closed_tickets,
    COUNT(CASE WHEN priority = 'High' THEN 1 END) as high_priority_tickets,
    COUNT(CASE WHEN priority = 'Medium' THEN 1 END) as medium_priority_tickets,
    COUNT(CASE WHEN priority = 'Low' THEN 1 END) as low_priority_tickets
FROM tickets;
