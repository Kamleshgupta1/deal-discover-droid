import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, X, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
}

interface MultiProductComparisonProps {
  onCompare: (products: string[]) => void;
  categoryName: string;
}

export const MultiProductComparison = ({ onCompare, categoryName }: MultiProductComparisonProps) => {
  const [products, setProducts] = useState<Product[]>([{ id: '1', name: '' }]);

  const addProduct = () => {
    const newId = (products.length + 1).toString();
    setProducts([...products, { id: newId, name: '' }]);
  };

  const removeProduct = (id: string) => {
    if (products.length > 1) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const updateProduct = (id: string, name: string) => {
    setProducts(products.map(p => p.id === id ? { ...p, name } : p));
  };

  const handleCompare = () => {
    const productNames = products
      .map(p => p.name.trim())
      .filter(name => name.length > 0);
    
    if (productNames.length >= 2) {
      onCompare(productNames);
    }
  };

  const isValid = products.filter(p => p.name.trim().length > 0).length >= 2;

  return (
    <Card className="card-feature">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5" />
          Compare Multiple {categoryName}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {products.map((product, index) => (
            <div key={product.id} className="flex gap-2 items-center">
              <div className="flex-1">
                <Label htmlFor={`product-${product.id}`} className="sr-only">
                  Product {index + 1}
                </Label>
                <Input
                  id={`product-${product.id}`}
                  value={product.name}
                  onChange={(e) => updateProduct(product.id, e.target.value)}
                  placeholder={`Enter ${categoryName.toLowerCase()} ${index + 1} name`}
                  className="w-full"
                />
              </div>
              {products.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeProduct(product.id)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={addProduct}
            className="flex-1"
            disabled={products.length >= 6}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
          <Button
            onClick={handleCompare}
            disabled={!isValid}
            className="flex-1"
          >
            <Search className="h-4 w-4 mr-2" />
            Compare
          </Button>
        </div>

        {products.length < 2 && (
          <Badge variant="secondary" className="w-full justify-center">
            Add at least 2 products to compare
          </Badge>
        )}
        {products.length >= 6 && (
          <Badge variant="secondary" className="w-full justify-center">
            Maximum 6 products can be compared
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};
