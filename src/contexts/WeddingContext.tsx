import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface WeddingData {
  coupleNames: {
    bride: string;
    groom: string;
  };
  tagline: string;
  loveStory: {
    title: string;
    content: string;
    imageAlt: string;
  };
  aboutWedding: {
    title: string;
    subtitle: string;
    sections: {
      gettingThere: {
        title: string;
        content: string;
      };
      whatToWear: {
        title: string;
        content: string;
      };
      parkingOptions: {
        title: string;
        content: string;
      };
    };
  };
  schedule: {
    title: string;
    date: string;
    events: {
      time: string;
      event: string;
    }[];
  };
  gallery: {
    title: string;
    photos: {
      id: string;
      url: string;
      alt: string;
    }[];
  };
  wishes: {
    title: string;
    list: {
      id: string;
      name: string;
      message: string;
      timestamp: string;
    }[];
  };
  moreInfo: {
    title: string;
    sections: {
      gifts: {
        question: string;
        answer: string;
      };
      children: {
        question: string;
        answer: string;
      };
      dietary: {
        question: string;
        answer: string;
      };
    };
  };
  contact: {
    title: string;
    bride: {
      name: string;
      address: string;
      city: string;
      country: string;
      phone: string;
      mobile: string;
      email: string;
    };
    groom: {
      name: string;
      address: string;
      city: string;
      country: string;
      phone: string;
      mobile: string;
      email: string;
    };
  };
}

interface WeddingContextType {
  weddingData: WeddingData;
  updateWeddingData: (path: string, value: any) => void;
  addArrayItem: (path: string, newItem: any) => void;
  deleteArrayItem: (path: string, index: number) => void;
  deleteArrayItemById: (path: string, id: string) => void;
  saveData: () => Promise<void>;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  isLoading: boolean;
}

const defaultWeddingData: WeddingData = {
  coupleNames: {
    bride: "Elaine",
    groom: "Duke"
  },
  tagline: "Road to Forever with",
  loveStory: {
    title: "Our Love Story",
    content: "Write a paragraph that tells your story as a couple. You can include details like how you met, your journey together, and what makes your relationship unique. This is your chance to share your personality and connect with your guests, giving them a glimpse into your love story and what this special day means to you.",
    imageAlt: "Duke and Elaine together"
  },
  aboutWedding: {
    title: "About the Wedding",
    subtitle: "Share details about your ceremony, reception, or anything else here.",
    sections: {
      gettingThere: {
        title: "Getting There",
        content: "Share details about your ceremony, reception, or any other program-related thing here."
      },
      whatToWear: {
        title: "What to Wear",
        content: "Share details about your ceremony, reception, or any other program-related thing here."
      },
      parkingOptions: {
        title: "Parking Options",
        content: "Share details about your ceremony, reception, or any other program-related thing here."
      }
    }
  },
  schedule: {
    title: "Schedule of Events",
    date: "November 12, 2030",
    events: [
      { time: "04:00 PM", event: "Wedding Ceremony" },
      { time: "06:00 PM", event: "Dinner" },
      { time: "07:00 PM", event: "Reception" },
      { time: "11:00 PM", event: "Cocktails" }
    ]
  },
  gallery: {
    title: "Our Gallery",
    photos: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop",
        alt: "Wedding ceremony moment"
      },
      {
        id: "2", 
        url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop",
        alt: "Couple portrait"
      },
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=400&h=400&fit=crop",
        alt: "Wedding rings"
      },
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=400&fit=crop",
        alt: "Wedding bouquet"
      },
      {
        id: "5",
        url: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=400&h=400&fit=crop",
        alt: "Wedding celebration"
      },
      {
        id: "6",
        url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400&h=400&fit=crop",
        alt: "Wedding venue"
      }
    ]
  },
  wishes: {
    title: "Guest Wishes",
    list: [
      {
        id: "1",
        name: "Sarah Johnson",
        message: "Wishing you both a lifetime of love and happiness! Can't wait to celebrate with you.",
        timestamp: "2024-12-15T10:30:00Z"
      },
      {
        id: "2",
        name: "Mike & Lisa",
        message: "So excited for your special day! You two are perfect together.",
        timestamp: "2024-12-14T15:45:00Z"
      }
    ]
  },
  moreInfo: {
    title: "More Information",
    sections: {
      gifts: {
        question: "What gift should I bring?",
        answer: "While your presence alone is enough for us, if you would still like to give a gift, you may contact us to request for our gift registry."
      },
      children: {
        question: "Can I bring my children?",
        answer: "We respectfully request that this be an occasion for adults only."
      },
      dietary: {
        question: "I have dietary restrictions. What should I do?",
        answer: "We are happy to accommodate dietary restrictions or allergies. Please inform us in advance so we can make appropriate arrangements."
      }
    }
  },
  contact: {
    title: "Contact Details",
    bride: {
      name: "Elaine Defaux",
      address: "123 Anywhere St.",
      city: "Any City ST 12345",
      country: "Country",
      phone: "(123) 456-7890",
      mobile: "(123) 456-7890",
      email: "hello@reallygreatsite.com"
    },
    groom: {
      name: "Duke Watson",
      address: "123 Anywhere St.",
      city: "Any City ST 12345",
      country: "Country",
      phone: "(123) 456-7890",
      mobile: "(123) 456-7890",
      email: "hello@reallygreatsite.com"
    }
  }
};

const WeddingContext = createContext<WeddingContextType | undefined>(undefined);

const user_id = 'duke_elaine_wedding_2030';

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.post(
        'https://kzhbmjygrzjardgruunp.supabase.co/functions/v1/getwebdata',
        { user_id },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (response.data && response.data.data) {
        setWeddingData(response.data.data);
      }
    } catch (error) {
      console.log('Failed to load data, using default:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateWeddingData = (path: string, value: any) => {
    setWeddingData(prev => {
      const newData = { ...prev };
      const pathArray = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      
      current[pathArray[pathArray.length - 1]] = value;
      return newData;
    });
  };

  const addArrayItem = (path: string, newItem: any) => {
    setWeddingData(prev => {
      const newData = { ...prev };
      const pathArray = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      
      const arrayKey = pathArray[pathArray.length - 1];
      if (Array.isArray(current[arrayKey])) {
        current[arrayKey] = [...current[arrayKey], newItem];
      }
      return newData;
    });
  };

  const deleteArrayItem = (path: string, index: number) => {
    setWeddingData(prev => {
      const newData = { ...prev };
      const pathArray = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      
      const arrayKey = pathArray[pathArray.length - 1];
      if (Array.isArray(current[arrayKey])) {
        current[arrayKey] = current[arrayKey].filter((_, i) => i !== index);
      }
      return newData;
    });
  };

  const deleteArrayItemById = (path: string, id: string) => {
    setWeddingData(prev => {
      const newData = { ...prev };
      const pathArray = path.split('.');
      let current: any = newData;
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        current = current[pathArray[i]];
      }
      
      const arrayKey = pathArray[pathArray.length - 1];
      if (Array.isArray(current[arrayKey])) {
        current[arrayKey] = current[arrayKey].filter((item: any) => item.id !== id);
      }
      return newData;
    });
  };

  const saveData = async () => {
    try {
      const jwtToken = localStorage.getItem('jwt_token');
      if (!jwtToken) {
        throw new Error('No authentication token found');
      }

      await axios.post(
        'https://kzhbmjygrzjardgruunp.supabase.co/functions/v1/webdata',
        {
          user_id,
          data: weddingData,
        },
        {
          headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Failed to save data:', error);
      throw error;
    }
  };

  return (
    <WeddingContext.Provider value={{
      weddingData,
      updateWeddingData,
      addArrayItem,
      deleteArrayItem,
      deleteArrayItemById,
      saveData,
      isAuthenticated,
      setIsAuthenticated,
      isLoading
    }}>
      {children}
    </WeddingContext.Provider>
  );
};

export const useWedding = () => {
  const context = useContext(WeddingContext);
  if (!context) {
    throw new Error('useWedding must be used within a WeddingProvider');
  }
  return context;
};
