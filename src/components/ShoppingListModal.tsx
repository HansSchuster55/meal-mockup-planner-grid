
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ShoppingCart, Download } from 'lucide-react';

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  shoppingList: { category: string; items: string[] }[];
}

export const ShoppingListModal: React.FC<ShoppingListModalProps> = ({
  isOpen,
  onClose,
  shoppingList,
}) => {
  const handleExport = () => {
    // Mock export functionality
    console.log('Exporting shopping list');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping List for This Week
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-end">
            <Button onClick={handleExport} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export List
            </Button>
          </div>

          <div className="space-y-6 max-h-96 overflow-y-auto">
            {shoppingList.map((category) => (
              <div key={category.category} className="space-y-3">
                <h3 className="font-semibold text-lg text-gray-900 border-b pb-2">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Checkbox id={`item-${category.category}-${index}`} />
                      <label
                        htmlFor={`item-${category.category}-${index}`}
                        className="text-gray-700 cursor-pointer flex-1"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {shoppingList.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No meals planned yet. Add some meals to generate your shopping list!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
