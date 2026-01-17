-- Create stock_adjustments table
CREATE TABLE IF NOT EXISTS stock_adjustments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  adjustment_number TEXT NOT NULL,
  adjusted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  location TEXT,
  reason TEXT,
  value DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for stock_adjustments
CREATE INDEX IF NOT EXISTS idx_stock_adjustments_status ON stock_adjustments(status);
CREATE INDEX IF NOT EXISTS idx_stock_adjustments_date ON stock_adjustments(adjusted_date);

-- Create stock_transfers table
CREATE TABLE IF NOT EXISTS stock_transfers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transfer_number TEXT NOT NULL,
  created_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  origin TEXT,
  destination TEXT,
  value DECIMAL(10,2) DEFAULT 0,
  expected_arrival DATE,
  status TEXT DEFAULT 'created' CHECK (status IN ('created', 'in_transit', 'received', 'done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for stock_transfers
CREATE INDEX IF NOT EXISTS idx_stock_transfers_status ON stock_transfers(status);

-- Create stocktakes table
CREATE TABLE IF NOT EXISTS stocktakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stocktake_number TEXT NOT NULL,
  reason TEXT,
  location TEXT,
  created_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_date TIMESTAMP WITH TIME ZONE,
  stock_adjustment_id UUID REFERENCES stock_adjustments(id),
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for stocktakes
CREATE INDEX IF NOT EXISTS idx_stocktakes_status ON stocktakes(status);
