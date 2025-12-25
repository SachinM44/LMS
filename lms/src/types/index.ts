
export  enum ActivityType{
   CLASS="CLASS",
   QUIZ='QUIZ',
   ASSIGNMENT='ASSIGNMENT'
}

export type Activity = 
   |
   {
    id:string,
    title:string,
    type: ActivityType.CLASS
    category:string,
    instructor:string,
    progress:number,
  durationLeft:string
   } | {
    id:string
    title:string
    type:ActivityType.QUIZ | ActivityType.ASSIGNMENT
    category:string,
    dueDate:string,
    status : 'PENDING' | 'COMPLETED'
   }


export type FilterType = 'All' | 'Classes' | 'Assessments' | 'AI' | 'ML' | 'Cloud Computing' 

export interface ThemeColors {
  background: string;
  card: string;
  cardBorder: string;
  text: string;
  textSecondary: string;
  border: string;
  primary: string;
  primaryHover: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  shadow: string;
}

export interface Theme {
  isDark: boolean;
  colors: ThemeColors;
}

export interface ThemeContextType {
    isDark:boolean,
    toggleTheme:()=>void;
    colors: ThemeColors
    theme: Theme
}