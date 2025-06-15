
import React from 'react';
import { useWedding } from '../contexts/WeddingContext';
import { EditableText } from './EditableText';
import { Button } from './ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface FAQSectionProps {
  sections: Record<string, { question: string; answer: string }>;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ sections }) => {
  const { isAuthenticated, weddingData, updateWeddingData } = useWedding();

  const sectionKeys = Object.keys(sections);

  const handleAddFAQ = () => {
    const newKey = `faq_${Date.now()}`;
    const newFAQ = {
      question: 'New Question?',
      answer: 'Your answer here.'
    };
    
    const updatedSections = {
      ...weddingData.moreInfo.sections,
      [newKey]: newFAQ
    };
    
    updateWeddingData('moreInfo.sections', updatedSections);
  };

  const handleDeleteFAQ = (keyToDelete: string) => {
    const updatedSections = { ...weddingData.moreInfo.sections };
    delete updatedSections[keyToDelete];
    updateWeddingData('moreInfo.sections', updatedSections);
  };

  return (
    <div className="space-y-10">
      {sectionKeys.map((key) => (
        <div key={key} className="group">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <EditableText path={`moreInfo.sections.${key}.question`}>
                <h3 className="font-script text-2xl md:text-3xl text-cream-200 mb-4">
                  {sections[key].question}
                </h3>
              </EditableText>
              
              <EditableText path={`moreInfo.sections.${key}.answer`} isTextarea>
                <p className="text-cream-300 leading-relaxed">
                  {sections[key].answer}
                </p>
              </EditableText>
            </div>

            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteFAQ(key)}
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-400 hover:text-red-300 hover:bg-red-900/20 ml-4"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}

      {isAuthenticated && (
        <Button
          onClick={handleAddFAQ}
          variant="outline"
          className="w-full border-cream-400 text-cream-200 hover:bg-cream-900/20"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New FAQ
        </Button>
      )}
    </div>
  );
};
