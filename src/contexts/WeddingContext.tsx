import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getAuthToken, isAuthenticated as checkSupabaseAuth } from '../lib/supabase';
import { toast } from 'sonner';

export interface WeddingData {
  coupleNames: {
    bride: string;
    groom: string;
  };
  tagline: string;
  heroBackground: string;
  backgroundMusic?: {
    url: string;
    title: string;
  };
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
  heroBackground: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=800&fit=crop",
  backgroundMusic: {
    url: "",
    title: ""
  },
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

export const WeddingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weddingData, setWeddingData] = useState<WeddingData>(defaultWeddingData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session);
      setIsAuthenticated(!!session);
      if (session?.user) {
        setCurrentUserId(session.user.id);
        loadData(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const authStatus = await checkSupabaseAuth();
    setIsAuthenticated(authStatus);
    console.log('Auth status:', authStatus);
    
    if (authStatus) {
      const { data: { user } } = await supabase.auth.getUser();
      console.log('Authenticated user:', user);
      if (user) {
        setCurrentUserId(user.id);
        await loadData(user.id);
      }
    } else {
      setCurrentUserId(null);
      // Use VITE_USER_ID from environment variables for unauthenticated users
      const defaultUserId = import.meta.env.VITE_USER_ID;
      console.log('Default user ID from env:', defaultUserId);
      if (defaultUserId) {
        await loadData(defaultUserId);
      } else {
        console.error('VITE_USER_ID not found in environment variables');
        setWeddingData(defaultWeddingData);
      }
    }
  };

  const loadData = async (userId: string) => {
    try {
      setIsLoading(true);
      console.log('Loading data for userId:', userId);
      
      // Always try the edge function first
      const { data: edgeData, error: edgeError } = await supabase
        .functions
        .invoke('getwebdata', {
          body: { user_id: userId }
        });

      console.log('Raw edge function response:', edgeData);

      if (edgeError) {
        console.error('Error fetching from edge function:', edgeError);
        throw edgeError;
      }

      // Parse the JSON string response
      let parsedData;
      try {
        parsedData = typeof edgeData === 'string' ? JSON.parse(edgeData) : edgeData;
        console.log('Parsed edge function data:', parsedData);
      } catch (parseError) {
        console.error('Error parsing edge function response:', parseError);
        throw parseError;
      }

      // Check if parsedData exists and has the expected structure
      if (parsedData) {
        console.log('Parsed data type:', typeof parsedData);
        console.log('Parsed data keys:', Object.keys(parsedData));
        
        // Handle both possible response formats
        const weddingData = parsedData.web_data || parsedData.data;
        
        if (weddingData) {
          console.log('Found wedding data:', weddingData);
          setWeddingData(weddingData);
          return;
        } else {
          console.log('No wedding data found in parsed response');
        }
      } else {
        console.log('No parsed data received');
      }

      // If no edge function data, try the table for authenticated users
      if (isAuthenticated) {
        const { data: tableData, error: tableError } = await supabase
          .from('web_entries')
          .select('*')
          .eq('user_id', userId)
          .single();

        console.log('Table data response:', tableData);

        if (tableError && tableError.code !== 'PGRST116') {
          console.error('Error fetching from table:', tableError);
          throw tableError;
        }

        if (tableData && tableData.web_data) {
          console.log('Setting data from table:', tableData.web_data);
          setWeddingData(tableData.web_data);
          return;
        }
      }

      // If no data found anywhere and user is not authenticated, use default data
      if (!isAuthenticated) {
        console.log('No data found and user not authenticated, using default data');
        setWeddingData(defaultWeddingData);
      } else {
        // If authenticated but no data found, show error
        console.error('No data found for authenticated user');
        toast.error('No wedding data found. Please try again later.');
      }
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Failed to load wedding data. Please try again later.');
      // Only use default data for non-authenticated users
      if (!isAuthenticated) {
        setWeddingData(defaultWeddingData);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const saveToTable = async (userId: string, data: WeddingData) => {
    try {
      const { error } = await supabase
        .from('web_entries')
        .upsert({
          user_id: userId,
          web_data: data,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Failed to save to table:', error);
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
    if (!isAuthenticated || !currentUserId) {
      toast.error('Please log in to save changes');
      return;
    }

    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Save to both the edge function and the table
      const [edgeResult, tableResult] = await Promise.all([
        supabase.functions.invoke('webdata', {
          body: {
            user_id: currentUserId,
            web_data: weddingData
          }
        }),
        saveToTable(currentUserId, weddingData)
      ]);

      if (edgeResult.error) throw edgeResult.error;
      
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Failed to save data:', error);
      toast.error('Failed to save changes');
      throw error;
    }
  };

  // Auto-save when wedding data changes
  useEffect(() => {
    if (isAuthenticated && currentUserId && !isLoading) {
      const saveTimeout = setTimeout(async () => {
        try {
          await saveData();
          toast.success('Changes saved successfully');
        } catch (error) {
          // Error toast is already handled in saveData
        }
      }, 1000); // Debounce save for 1 second

      return () => clearTimeout(saveTimeout);
    }
  }, [weddingData, isAuthenticated, currentUserId]);

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
