import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Minus } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface ComparisonRow {
  id: string;
  feature: string;
  option1: string;
  option2: string;
  [key: string]: string;
}

interface ComparisonBuilderProps {
  onInsert: (html: string) => void;
}

export const ComparisonBuilder = ({ onInsert }: ComparisonBuilderProps) => {
  const [title, setTitle] = useState('');
  const [headers, setHeaders] = useState(['Option 1', 'Option 2']);
  const [rows, setRows] = useState<ComparisonRow[]>([
    { id: '1', feature: 'Feature 1', option1: '', option2: '' }
  ]);

  const addColumn = () => {
    if (headers.length < 4) {
      setHeaders([...headers, `Option ${headers.length + 1}`]);
      setRows(rows.map(row => {
        const newRow = { ...row };
        newRow[`option${headers.length + 1}`] = '';
        return newRow;
      }));
    }
  };

  const removeColumn = () => {
    if (headers.length > 2) {
      const newHeaders = headers.slice(0, -1);
      setHeaders(newHeaders);
      setRows(rows.map(row => {
        const newRow = { ...row };
        delete newRow[`option${headers.length}`];
        return newRow;
      }));
    }
  };

  const addRow = () => {
    const newRow: ComparisonRow = {
      id: Date.now().toString(),
      feature: `Feature ${rows.length + 1}`,
      option1: '',
      option2: '',
    };
    headers.forEach((_, idx) => {
      if (idx > 1) {
        newRow[`option${idx + 1}`] = '';
      }
    });
    setRows([...rows, newRow]);
  };

  const removeRow = (id: string) => {
    setRows(rows.filter(row => row.id !== id));
  };

  const updateRow = (id: string, field: string, value: string) => {
    setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  const generateHTML = () => {
    const tableHTML = `
      <div class="comparison-table">
        ${title ? `<h3>${title}</h3>` : ''}
        <table class="w-full border-collapse border border-border">
          <thead>
            <tr class="bg-muted">
              <th class="border border-border p-3 text-left">Feature</th>
              ${headers.map(h => `<th class="border border-border p-3 text-center">${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map(row => `
              <tr>
                <td class="border border-border p-3 font-medium">${row.feature}</td>
                ${headers.map((_, idx) => `<td class="border border-border p-3 text-center">${row[`option${idx + 1}`] || '-'}</td>`).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
    return tableHTML;
  };

  const handleInsert = () => {
    onInsert(generateHTML());
  };

  return (
    <Card className="p-6 space-y-4">
      <div>
        <Label>Comparison Title (Optional)</Label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Product Comparison"
        />
      </div>

      <div className="flex gap-2">
        <Button type="button" size="sm" onClick={addColumn} disabled={headers.length >= 4}>
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </Button>
        <Button type="button" size="sm" variant="outline" onClick={removeColumn} disabled={headers.length <= 2}>
          <Minus className="h-4 w-4 mr-2" />
          Remove Column
        </Button>
      </div>

      <div className="space-y-2">
        <Label>Column Headers</Label>
        <div className="grid grid-cols-2 gap-2">
          {headers.map((header, idx) => (
            <Input
              key={idx}
              value={header}
              onChange={(e) => updateHeader(idx, e.target.value)}
              placeholder={`Column ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <Label>Comparison Rows</Label>
          <Button type="button" size="sm" onClick={addRow}>
            <Plus className="h-4 w-4 mr-2" />
            Add Row
          </Button>
        </div>

        {rows.map((row) => (
          <Card key={row.id} className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <Input
                value={row.feature}
                onChange={(e) => updateRow(row.id, 'feature', e.target.value)}
                placeholder="Feature name"
                className="flex-1 mr-2"
              />
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => removeRow(row.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {headers.map((_, idx) => (
                <Textarea
                  key={idx}
                  value={row[`option${idx + 1}`] || ''}
                  onChange={(e) => updateRow(row.id, `option${idx + 1}`, e.target.value)}
                  placeholder={headers[idx]}
                  rows={2}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Button type="button" onClick={handleInsert} className="w-full">
        Insert Comparison Table
      </Button>
    </Card>
  );
};
