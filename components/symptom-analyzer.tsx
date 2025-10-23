"use client"

import { useState } from "react"
import {
  Search,
  X,
  AlertCircle,
  Pill,
  Shield,
  Phone,
  Save,
  CheckCircle2,
  XCircle,
  Zap,
  Heart,
  Activity,
} from "lucide-react"

interface Symptom {
  id: string
  name: string
}

interface DiagnosisResult {
  condition: string
  probability: number
  description: string
}

interface Medicine {
  name: string
  dosage: string
  frequency: string
  duration: string
  sideEffects: string
}

interface Treatment {
  medicines: Medicine[]
  homeRemedies: string[]
  precautions: string[]
  dos: string[]
  donts: string[]
}

const COMMON_SYMPTOMS = [
  "Fever",
  "Fatigue",
  "Weakness",
  "Headache",
  "Dizziness",
  "Sweating",
  "Chills",
  "Loss of appetite",
  "Weight loss",
  "Weight gain",
  "Nausea",
  "Vomiting",
  "Cough (dry)",
  "Cough (wet)",
  "Sore throat",
  "Shortness of breath",
  "Runny nose",
  "Nasal congestion",
  "Sneezing",
  "Chest pain",
  "Wheezing",
  "Stomach pain",
  "Indigestion",
  "Bloating",
  "Diarrhea",
  "Constipation",
  "Heartburn",
  "Gas",
  "Nausea after eating",
  "Dark or bloody stools",
  "Chest tightness",
  "Palpitations",
  "Swelling in feet or ankles",
  "Fainting",
  "Shortness of breath during exertion",
  "Joint pain",
  "Muscle pain",
  "Back pain",
  "Stiffness",
  "Swelling in joints",
  "Body aches",
  "Migraine",
  "Tingling",
  "Numbness",
  "Blurred vision",
  "Tremors",
  "Loss of balance",
  "Confusion",
  "Sleep issues",
  "Memory loss",
  "Rash",
  "Itching",
  "Redness",
  "Dry skin",
  "Blisters",
  "Acne",
  "Pimples",
  "Peeling skin",
  "Skin discoloration",
  "Red eyes",
  "Eye pain",
  "Sensitivity to light",
  "Watery eyes",
  "Double vision",
  "Ear pain",
  "Ringing in ears",
  "Hearing loss",
  "Ear discharge",
  "Feeling of fullness in ear",
  "High fever with chills",
  "Joint and muscle pain",
  "Rash with fever",
  "Persistent cough",
  "Sore throat with swollen glands",
  "Body ache with fatigue",
  "Diarrhea with dehydration",
  "Loss of taste or smell",
  "Frequent urination",
  "Increased thirst",
  "Vision problems",
  "Slow wound healing",
  "Persistent tiredness",
  "High blood pressure",
  "Low blood pressure",
  "Difficulty breathing after activity",
  "Severe chest pain",
  "Sudden confusion",
  "Difficulty breathing",
  "Uncontrolled bleeding",
  "Sudden vision loss",
  "Seizures",
  "Blue lips or fingers",
  "Cold",
]

const DIAGNOSIS_DATABASE: Record<string, DiagnosisResult[]> = {
  "Fever,Cough,Sore Throat": [
    {
      condition: "Common Cold",
      probability: 85,
      description: "A viral infection affecting the upper respiratory tract, usually self-limiting",
    },
    {
      condition: "Flu (Influenza)",
      probability: 75,
      description: "A contagious respiratory illness caused by influenza virus with more severe symptoms",
    },
    {
      condition: "COVID-19",
      probability: 65,
      description: "A respiratory illness caused by SARS-CoV-2 virus with variable severity",
    },
    {
      condition: "Bronchitis",
      probability: 60,
      description: "Inflammation of the bronchial tubes carrying air to the lungs",
    },
  ],
  "Fever,Body Aches,Fatigue": [
    {
      condition: "Viral Infection",
      probability: 80,
      description: "General viral infection affecting the body",
    },
    {
      condition: "Flu (Influenza)",
      probability: 75,
      description: "A contagious respiratory illness",
    },
    {
      condition: "Dengue Fever",
      probability: 65,
      description: "Mosquito-borne viral infection with severe body aches",
    },
  ],
  "Headache,Dizziness": [
    {
      condition: "Migraine",
      probability: 70,
      description: "A neurological condition causing severe headaches",
    },
    {
      condition: "Tension Headache",
      probability: 65,
      description: "Headache caused by muscle tension",
    },
    {
      condition: "Vertigo",
      probability: 55,
      description: "A sensation of spinning or dizziness",
    },
    {
      condition: "Low Blood Pressure",
      probability: 50,
      description: "Reduced blood pressure causing dizziness",
    },
  ],
  "Chest Pain,Shortness of Breath": [
    {
      condition: "Anxiety Attack",
      probability: 60,
      description: "Panic or anxiety-related chest discomfort",
    },
    {
      condition: "Asthma",
      probability: 55,
      description: "Chronic respiratory condition",
    },
    {
      condition: "Angina",
      probability: 50,
      description: "Chest pain due to reduced blood flow to heart",
    },
  ],
  "Stomach Pain,Diarrhea,Nausea": [
    {
      condition: "Gastroenteritis",
      probability: 80,
      description: "Inflammation of stomach and intestines",
    },
    {
      condition: "Food Poisoning",
      probability: 75,
      description: "Illness caused by contaminated food",
    },
    {
      condition: "Irritable Bowel Syndrome",
      probability: 60,
      description: "Chronic digestive disorder",
    },
  ],
  "Rash,Itching,Redness": [
    {
      condition: "Allergic Reaction",
      probability: 75,
      description: "Skin reaction to allergen exposure",
    },
    {
      condition: "Eczema",
      probability: 70,
      description: "Chronic inflammatory skin condition",
    },
    {
      condition: "Urticaria (Hives)",
      probability: 65,
      description: "Raised, itchy welts on the skin",
    },
  ],
  "Frequent Urination,Increased Thirst": [
    {
      condition: "Diabetes",
      probability: 70,
      description: "Metabolic disorder affecting blood sugar levels",
    },
    {
      condition: "Urinary Tract Infection",
      probability: 65,
      description: "Bacterial infection of urinary system",
    },
  ],
  "Joint Pain,Swelling in Joints": [
    {
      condition: "Arthritis",
      probability: 75,
      description: "Inflammation of joints causing pain and stiffness",
    },
    {
      condition: "Rheumatoid Arthritis",
      probability: 70,
      description: "Autoimmune disease affecting joints",
    },
  ],
  // Single symptom entries for better matching
  Fever: [
    {
      condition: "Common Cold",
      probability: 60,
      description: "Viral infection with fever",
    },
    {
      condition: "Flu (Influenza)",
      probability: 70,
      description: "Contagious respiratory illness",
    },
    {
      condition: "Viral Infection",
      probability: 65,
      description: "General viral infection",
    },
    {
      condition: "Urinary Tract Infection",
      probability: 55,
      description: "Bacterial infection causing fever",
    },
  ],
  "Cough (dry)": [
    {
      condition: "Common Cold",
      probability: 75,
      description: "Viral infection causing dry cough",
    },
    {
      condition: "Allergies",
      probability: 70,
      description: "Allergic reaction causing dry cough",
    },
    {
      condition: "Asthma",
      probability: 65,
      description: "Chronic condition with dry cough",
    },
    {
      condition: "Acid Reflux",
      probability: 60,
      description: "GERD causing throat irritation and dry cough",
    },
  ],
  "Cough (wet)": [
    {
      condition: "Bronchitis",
      probability: 80,
      description: "Inflammation of bronchial tubes with mucus",
    },
    {
      condition: "Pneumonia",
      probability: 75,
      description: "Lung infection causing productive cough",
    },
    {
      condition: "Common Cold",
      probability: 65,
      description: "Viral infection with chest congestion",
    },
    {
      condition: "Post-nasal Drip",
      probability: 60,
      description: "Mucus drainage causing wet cough",
    },
  ],
  "Sore Throat": [
    {
      condition: "Common Cold",
      probability: 75,
      description: "Viral infection of throat",
    },
    {
      condition: "Strep Throat",
      probability: 70,
      description: "Bacterial infection of throat",
    },
    {
      condition: "Pharyngitis",
      probability: 65,
      description: "Inflammation of pharynx",
    },
  ],
  Headache: [
    {
      condition: "Tension Headache",
      probability: 70,
      description: "Headache from muscle tension",
    },
    {
      condition: "Migraine",
      probability: 60,
      description: "Severe neurological headache",
    },
    {
      condition: "Dehydration",
      probability: 55,
      description: "Headache from lack of fluids",
    },
    {
      condition: "Eye Strain",
      probability: 50,
      description: "Headache from eye fatigue",
    },
  ],
  "Stomach Pain": [
    {
      condition: "Gastroenteritis",
      probability: 70,
      description: "Inflammation of stomach and intestines",
    },
    {
      condition: "Indigestion",
      probability: 65,
      description: "Digestive discomfort",
    },
    {
      condition: "Irritable Bowel Syndrome",
      probability: 55,
      description: "Chronic digestive disorder",
    },
  ],
  Diarrhea: [
    {
      condition: "Gastroenteritis",
      probability: 75,
      description: "Inflammation of stomach and intestines",
    },
    {
      condition: "Food Poisoning",
      probability: 70,
      description: "Illness from contaminated food",
    },
    {
      condition: "Irritable Bowel Syndrome",
      probability: 60,
      description: "Chronic digestive disorder",
    },
  ],
  Rash: [
    {
      condition: "Allergic Reaction",
      probability: 75,
      description: "Skin reaction to allergen",
    },
    {
      condition: "Eczema",
      probability: 70,
      description: "Chronic skin inflammation",
    },
    {
      condition: "Urticaria (Hives)",
      probability: 65,
      description: "Raised itchy welts on skin",
    },
  ],
  Fatigue: [
    {
      condition: "Anemia",
      probability: 70,
      description: "Low red blood cell count",
    },
    {
      condition: "Chronic Fatigue Syndrome",
      probability: 65,
      description: "Persistent tiredness",
    },
    {
      condition: "Depression",
      probability: 60,
      description: "Mental health condition",
    },
    {
      condition: "Hypothyroidism",
      probability: 55,
      description: "Underactive thyroid",
    },
  ],
  "Joint Pain": [
    {
      condition: "Arthritis",
      probability: 75,
      description: "Joint inflammation",
    },
    {
      condition: "Injury",
      probability: 60,
      description: "Physical trauma to joint",
    },
    {
      condition: "Gout",
      probability: 55,
      description: "Crystal buildup in joints",
    },
  ],
  "Muscle Pain": [
    {
      condition: "Muscle Strain",
      probability: 70,
      description: "Overuse or injury",
    },
    {
      condition: "Fibromyalgia",
      probability: 60,
      description: "Chronic muscle pain",
    },
    {
      condition: "Viral Infection",
      probability: 55,
      description: "Body aches from infection",
    },
  ],
  Nausea: [
    {
      condition: "Gastroenteritis",
      probability: 75,
      description: "Stomach infection",
    },
    {
      condition: "Migraine",
      probability: 65,
      description: "Severe headache with nausea",
    },
    {
      condition: "Motion Sickness",
      probability: 60,
      description: "Travel-related nausea",
    },
    {
      condition: "Pregnancy",
      probability: 55,
      description: "Morning sickness",
    },
  ],
  "Shortness of Breath": [
    {
      condition: "Asthma",
      probability: 75,
      description: "Chronic respiratory condition",
    },
    {
      condition: "Anxiety Attack",
      probability: 65,
      description: "Panic-related breathing difficulty",
    },
    {
      condition: "Anemia",
      probability: 55,
      description: "Low oxygen-carrying capacity",
    },
  ],
  Dizziness: [
    {
      condition: "Vertigo",
      probability: 70,
      description: "Spinning sensation",
    },
    {
      condition: "Low Blood Pressure",
      probability: 65,
      description: "Reduced blood flow to brain",
    },
    {
      condition: "Dehydration",
      probability: 60,
      description: "Fluid imbalance",
    },
    {
      condition: "Anemia",
      probability: 55,
      description: "Low red blood cells",
    },
  ],
  "Blurred Vision": [
    {
      condition: "Eye Strain",
      probability: 70,
      description: "Tired eyes from screen use",
    },
    {
      condition: "Refractive Error",
      probability: 60,
      description: "Need for glasses/contact lenses",
    },
    {
      condition: "Diabetes",
      probability: 55,
      description: "High blood sugar affecting eyes",
    },
  ],
  "Chest Pain": [
    {
      condition: "Anxiety Attack",
      probability: 65,
      description: "Stress-related chest discomfort",
    },
    {
      condition: "Heartburn",
      probability: 60,
      description: "Acid reflux",
    },
    {
      condition: "Muscle Strain",
      probability: 55,
      description: "Chest muscle injury",
    },
  ],
  "Back Pain": [
    {
      condition: "Muscle Strain",
      probability: 70,
      description: "Back muscle injury",
    },
    {
      condition: "Poor Posture",
      probability: 65,
      description: "Postural misalignment",
    },
    {
      condition: "Arthritis",
      probability: 60,
      description: "Spinal joint inflammation",
    },
  ],
  "Loss of Appetite": [
    {
      condition: "Depression",
      probability: 70,
      description: "Mental health affecting eating",
    },
    {
      condition: "Gastroenteritis",
      probability: 65,
      description: "Stomach infection",
    },
    {
      condition: "Anxiety",
      probability: 60,
      description: "Stress affecting appetite",
    },
  ],
  "Weight Loss": [
    {
      condition: "Diabetes",
      probability: 65,
      description: "Uncontrolled blood sugar",
    },
    {
      condition: "Hyperthyroidism",
      probability: 60,
      description: "Overactive thyroid",
    },
    {
      condition: "Depression",
      probability: 55,
      description: "Mental health condition",
    },
  ],
  "Sleep Issues": [
    {
      condition: "Insomnia",
      probability: 75,
      description: "Difficulty falling asleep",
    },
    {
      condition: "Stress",
      probability: 65,
      description: "Anxiety affecting sleep",
    },
    {
      condition: "Sleep Apnea",
      probability: 60,
      description: "Breathing disorder during sleep",
    },
  ],
  // Additional common combinations
  "Headache,Nausea": [
    {
      condition: "Migraine",
      probability: 75,
      description: "Severe headache with nausea",
    },
    {
      condition: "Tension Headache",
      probability: 60,
      description: "Headache with digestive upset",
    },
  ],
  "Fatigue,Weakness": [
    {
      condition: "Anemia",
      probability: 70,
      description: "Low red blood cell count causing fatigue",
    },
    {
      condition: "Chronic Fatigue Syndrome",
      probability: 65,
      description: "Persistent tiredness and weakness",
    },
    {
      condition: "Viral Infection",
      probability: 60,
      description: "General viral infection with fatigue",
    },
  ],
  "Nausea,Vomiting": [
    {
      condition: "Gastroenteritis",
      probability: 80,
      description: "Stomach infection causing nausea and vomiting",
    },
    {
      condition: "Food Poisoning",
      probability: 75,
      description: "Contaminated food causing digestive upset",
    },
    {
      condition: "Migraine",
      probability: 60,
      description: "Severe headache with nausea",
    },
  ],
  "Shortness of Breath,Wheezing": [
    {
      condition: "Asthma",
      probability: 80,
      description: "Chronic respiratory condition with breathing difficulty",
    },
    {
      condition: "Bronchitis",
      probability: 65,
      description: "Inflammation causing breathing problems",
    },
  ],
  "Joint Pain,Muscle Pain": [
    {
      condition: "Arthritis",
      probability: 70,
      description: "Joint and muscle inflammation",
    },
    {
      condition: "Fibromyalgia",
      probability: 65,
      description: "Chronic muscle and joint pain condition",
    },
  ],
  "Blurred Vision,Headache": [
    {
      condition: "Migraine",
      probability: 70,
      description: "Headache with visual disturbances",
    },
    {
      condition: "Eye Strain",
      probability: 55,
      description: "Tired eyes causing headache and blurred vision",
    },
  ],
  "Chest Pain,Palpitations": [
    {
      condition: "Anxiety Attack",
      probability: 65,
      description: "Panic symptoms with chest discomfort",
    },
    {
      condition: "Heart Arrhythmia",
      probability: 55,
      description: "Irregular heartbeat causing chest pain",
    },
  ],
  "Loss of Appetite,Weight Loss": [
    {
      condition: "Depression",
      probability: 65,
      description: "Mental health condition affecting appetite",
    },
    {
      condition: "Hyperthyroidism",
      probability: 60,
      description: "Overactive thyroid causing weight changes",
    },
    {
      condition: "Cancer",
      probability: 50,
      description: "Serious condition requiring medical attention",
    },
  ],
  "Sleep Issues,Fatigue": [
    {
      condition: "Insomnia",
      probability: 70,
      description: "Sleep disorder causing chronic fatigue",
    },
    {
      condition: "Sleep Apnea",
      probability: 65,
      description: "Breathing disorder during sleep",
    },
  ],
}

const TREATMENT_DATABASE: Record<string, Treatment> = {
  "Common Cold": {
    medicines: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Every 6-8 hours",
        duration: "3-5 days",
        sideEffects: "Rare, generally well-tolerated",
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6-8 hours",
        duration: "3-5 days",
        sideEffects: "May cause stomach upset, take with food",
      },
      {
        name: "Vitamin C Supplements",
        dosage: "500-1000mg",
        frequency: "Daily",
        duration: "Until recovery",
        sideEffects: "Generally safe",
      },
    ],
    homeRemedies: [
      "Rest for 7-10 days",
      "Drink warm fluids (tea, soup, warm water)",
      "Honey and ginger tea",
      "Vitamin C rich foods (citrus, berries)",
      "Steam inhalation with eucalyptus oil",
      "Gargle with salt water",
      "Use humidifier",
    ],
    precautions: [
      "Wash hands frequently with soap and water",
      "Avoid touching face, eyes, and nose",
      "Stay hydrated - drink at least 8 glasses of water daily",
      "Get adequate rest (7-9 hours sleep)",
      "Avoid close contact with others to prevent spread",
      "Use tissues when sneezing or coughing",
      "Discard used tissues immediately",
      "Avoid smoking and secondhand smoke",
    ],
    dos: [
      "Do maintain good hygiene",
      "Do stay home to avoid spreading",
      "Do drink plenty of fluids",
      "Do use saline nasal drops",
      "Do eat nutritious food",
      "Do monitor your temperature",
    ],
    donts: [
      "Don't use antibiotics (viral infection)",
      "Don't share personal items",
      "Don't go to crowded places",
      "Don't ignore persistent symptoms",
      "Don't smoke or drink alcohol",
      "Don't exercise strenuously",
    ],
  },
  "Flu (Influenza)": {
    medicines: [
      {
        name: "Oseltamivir (Tamiflu)",
        dosage: "75mg",
        frequency: "Twice daily",
        duration: "5 days",
        sideEffects: "Nausea, vomiting - take with food",
      },
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Every 6-8 hours",
        duration: "5-7 days",
        sideEffects: "Rare, generally well-tolerated",
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6-8 hours",
        duration: "5-7 days",
        sideEffects: "May cause stomach upset",
      },
    ],
    homeRemedies: [
      "Complete bed rest for 7-10 days",
      "Hydration with warm fluids",
      "Warm soup and broths",
      "Steam inhalation",
      "Honey and lemon water",
      "Ginger tea",
      "Vitamin C and zinc supplements",
    ],
    precautions: [
      "Get flu vaccination annually",
      "Maintain distance from infected people (6 feet)",
      "Practice respiratory hygiene",
      "Avoid crowded places during flu season",
      "Boost immunity with vitamin C and D",
      "Monitor temperature regularly",
      "Ensure proper ventilation",
      "Wash hands frequently",
    ],
    dos: [
      "Do stay home for at least 5 days",
      "Do cover mouth when coughing",
      "Do drink warm fluids",
      "Do take prescribed antivirals",
      "Do monitor for complications",
    ],
    donts: [
      "Don't go to work or school",
      "Don't share food or drinks",
      "Don't ignore high fever",
      "Don't exercise during illness",
      "Don't use expired medications",
    ],
  },
  Migraine: {
    medicines: [
      {
        name: "Sumatriptan",
        dosage: "50mg",
        frequency: "As needed",
        duration: "Single dose",
        sideEffects: "Dizziness, tingling - take at first sign",
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6-8 hours",
        duration: "As needed",
        sideEffects: "Stomach upset possible",
      },
      {
        name: "Propranolol",
        dosage: "40-80mg",
        frequency: "Twice daily",
        duration: "Long-term prevention",
        sideEffects: "Fatigue, dizziness",
      },
    ],
    homeRemedies: [
      "Rest in a dark, quiet room",
      "Apply cold compress to forehead",
      "Apply warm compress to neck",
      "Massage temples and neck",
      "Drink plenty of water",
      "Avoid bright lights and loud noises",
      "Peppermint or lavender aromatherapy",
    ],
    precautions: [
      "Identify and avoid personal triggers",
      "Maintain regular sleep schedule",
      "Manage stress through meditation",
      "Stay hydrated throughout the day",
      "Limit caffeine intake",
      "Exercise regularly (30 mins daily)",
      "Avoid skipping meals",
      "Track migraine patterns",
    ],
    dos: [
      "Do take medication early",
      "Do rest in dark room",
      "Do stay hydrated",
      "Do keep a migraine diary",
      "Do practice relaxation techniques",
    ],
    donts: [
      "Don't ignore warning signs",
      "Don't overuse pain medication",
      "Don't skip meals",
      "Don't stay in bright light",
      "Don't stress excessively",
    ],
  },
  Gastroenteritis: {
    medicines: [
      {
        name: "Loperamide",
        dosage: "2mg",
        frequency: "After each loose stool",
        duration: "Until symptoms resolve",
        sideEffects: "Constipation if overused",
      },
      {
        name: "Metronidazole",
        dosage: "400mg",
        frequency: "Thrice daily",
        duration: "5-7 days",
        sideEffects: "Metallic taste, nausea",
      },
      {
        name: "Ondansetron",
        dosage: "4-8mg",
        frequency: "Every 8 hours",
        duration: "As needed",
        sideEffects: "Headache, constipation",
      },
    ],
    homeRemedies: [
      "Oral Rehydration Solution (ORS)",
      "Bland diet (rice, bread, bananas)",
      "Ginger tea",
      "Coconut water",
      "Avoid dairy and spicy food",
      "Small, frequent meals",
      "Probiotics (yogurt, kefir)",
    ],
    precautions: [
      "Practice food hygiene",
      "Drink clean, boiled water",
      "Wash hands before eating",
      "Avoid street food",
      "Cook food properly",
      "Maintain personal hygiene",
      "Separate utensils for sick person",
      "Sanitize bathroom regularly",
    ],
    dos: [
      "Do drink ORS solution",
      "Do eat bland foods",
      "Do maintain hygiene",
      "Do rest adequately",
      "Do monitor hydration",
    ],
    donts: [
      "Don't eat oily or spicy food",
      "Don't drink untreated water",
      "Don't share utensils",
      "Don't ignore dehydration signs",
      "Don't take antibiotics without prescription",
    ],
  },
  Diabetes: {
    medicines: [
      {
        name: "Metformin",
        dosage: "500-1000mg",
        frequency: "Twice daily",
        duration: "Long-term",
        sideEffects: "Stomach upset, metallic taste",
      },
      {
        name: "Glipizide",
        dosage: "5-10mg",
        frequency: "Once or twice daily",
        duration: "Long-term",
        sideEffects: "Hypoglycemia, weight gain",
      },
      {
        name: "Insulin",
        dosage: "As prescribed",
        frequency: "As prescribed",
        duration: "Long-term",
        sideEffects: "Hypoglycemia, injection site reactions",
      },
    ],
    homeRemedies: [
      "Regular exercise (150 mins/week)",
      "Balanced diet with whole grains",
      "Reduce sugar and refined carbs",
      "Increase fiber intake",
      "Maintain healthy weight",
      "Manage stress",
      "Adequate sleep (7-9 hours)",
    ],
    precautions: [
      "Monitor blood sugar regularly",
      "Check feet daily for sores",
      "Get annual eye exams",
      "Monitor blood pressure",
      "Get kidney function tests",
      "Maintain dental hygiene",
      "Wear medical alert bracelet",
      "Keep emergency contacts",
    ],
    dos: [
      "Do check blood sugar regularly",
      "Do take medications on time",
      "Do exercise daily",
      "Do eat healthy diet",
      "Do attend regular checkups",
    ],
    donts: [
      "Don't skip meals",
      "Don't ignore symptoms",
      "Don't miss medications",
      "Don't consume sugary drinks",
      "Don't neglect foot care",
    ],
  },
  Arthritis: {
    medicines: [
      {
        name: "Ibuprofen",
        dosage: "400-600mg",
        frequency: "Every 6-8 hours",
        duration: "As needed",
        sideEffects: "Stomach upset, take with food",
      },
      {
        name: "Methotrexate",
        dosage: "7.5-25mg",
        frequency: "Once weekly",
        duration: "Long-term",
        sideEffects: "Nausea, hair loss",
      },
      {
        name: "Corticosteroids",
        dosage: "5-10mg",
        frequency: "Daily",
        duration: "As prescribed",
        sideEffects: "Weight gain, mood changes",
      },
    ],
    homeRemedies: [
      "Warm water baths",
      "Heat therapy on joints",
      "Gentle stretching exercises",
      "Turmeric and ginger supplements",
      "Omega-3 rich foods",
      "Weight management",
      "Adequate rest",
    ],
    precautions: [
      "Maintain healthy weight",
      "Exercise regularly but gently",
      "Use proper posture",
      "Avoid repetitive movements",
      "Protect joints from injury",
      "Stay warm in cold weather",
      "Manage stress",
      "Get regular checkups",
    ],
    dos: [
      "Do gentle exercises",
      "Do apply heat therapy",
      "Do maintain healthy weight",
      "Do take medications regularly",
      "Do rest affected joints",
    ],
    donts: [
      "Don't overexert joints",
      "Don't ignore pain",
      "Don't skip medications",
      "Don't gain excessive weight",
      "Don't stay inactive",
    ],
  },
  "Viral Infection": {
    medicines: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Every 6-8 hours",
        duration: "5-7 days",
        sideEffects: "Rare, generally well-tolerated",
      },
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6-8 hours",
        duration: "5-7 days",
        sideEffects: "May cause stomach upset",
      },
    ],
    homeRemedies: [
      "Complete rest",
      "Drink plenty of fluids",
      "Warm broths and soups",
      "Vitamin C supplements",
      "Honey and lemon",
      "Ginger tea",
      "Steam inhalation",
    ],
    precautions: [
      "Maintain good hygiene",
      "Avoid close contact with others",
      "Wash hands frequently",
      "Stay hydrated",
      "Get adequate rest",
      "Avoid crowded places",
      "Monitor symptoms",
      "Seek medical help if worsens",
    ],
    dos: [
      "Do rest adequately",
      "Do drink fluids",
      "Do maintain hygiene",
      "Do monitor temperature",
      "Do eat nutritious food",
    ],
    donts: [
      "Don't use antibiotics",
      "Don't share items",
      "Don't exercise strenuously",
      "Don't ignore symptoms",
      "Don't skip meals",
    ],
  },
  "Tension Headache": {
    medicines: [
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6-8 hours",
        duration: "As needed",
        sideEffects: "Stomach upset possible",
      },
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Every 6-8 hours",
        duration: "As needed",
        sideEffects: "Rare, generally well-tolerated",
      },
    ],
    homeRemedies: [
      "Neck and shoulder massage",
      "Warm compress on neck",
      "Relaxation techniques",
      "Deep breathing exercises",
      "Yoga and stretching",
      "Adequate sleep",
      "Stress management",
    ],
    precautions: [
      "Maintain good posture",
      "Take regular breaks from screen",
      "Manage stress effectively",
      "Exercise regularly",
      "Stay hydrated",
      "Avoid caffeine overuse",
      "Get adequate sleep",
      "Relax neck and shoulder muscles",
    ],
    dos: [
      "Do take breaks regularly",
      "Do practice relaxation",
      "Do maintain good posture",
      "Do exercise regularly",
      "Do manage stress",
    ],
    donts: [
      "Don't stay in one position",
      "Don't stress excessively",
      "Don't skip meals",
      "Don't overuse caffeine",
      "Don't ignore persistent headaches",
    ],
  },
  "Allergic Reaction": {
    medicines: [
      {
        name: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "As needed",
        sideEffects: "Drowsiness, dry mouth",
      },
      {
        name: "Loratadine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "As needed",
        sideEffects: "Minimal side effects",
      },
      {
        name: "Hydrocortisone Cream",
        dosage: "1%",
        frequency: "2-3 times daily",
        duration: "Until resolved",
        sideEffects: "Skin irritation if overused",
      },
    ],
    homeRemedies: [
      "Avoid allergen triggers",
      "Cool compress on affected area",
      "Oatmeal baths",
      "Calamine lotion",
      "Avoid scratching",
      "Wear soft clothing",
      "Use hypoallergenic products",
    ],
    precautions: [
      "Identify allergen triggers",
      "Avoid contact with allergens",
      "Keep environment clean",
      "Use air purifiers",
      "Wash hands frequently",
      "Avoid contaminated foods",
      "Wear protective clothing",
      "Keep emergency medications",
    ],
    dos: [
      "Do identify triggers",
      "Do avoid allergens",
      "Do keep skin clean",
      "Do use prescribed medications",
      "Do seek medical help if severe",
    ],
    donts: [
      "Don't scratch affected area",
      "Don't use harsh soaps",
      "Don't ignore severe reactions",
      "Don't expose to allergens",
      "Don't delay treatment",
    ],
  },
  Eczema: {
    medicines: [
      {
        name: "Hydrocortisone Cream",
        dosage: "1%",
        frequency: "2-3 times daily",
        duration: "As needed",
        sideEffects: "Skin thinning if overused",
      },
      {
        name: "Tacrolimus",
        dosage: "0.03-0.1%",
        frequency: "Twice daily",
        duration: "As prescribed",
        sideEffects: "Burning sensation initially",
      },
    ],
    homeRemedies: [
      "Moisturize regularly",
      "Use fragrance-free products",
      "Oatmeal baths",
      "Coconut oil application",
      "Avoid hot water",
      "Wear soft clothing",
      "Manage stress",
    ],
    precautions: [
      "Keep skin moisturized",
      "Avoid irritants and allergens",
      "Use mild soaps",
      "Avoid extreme temperatures",
      "Manage stress levels",
      "Maintain good hygiene",
      "Avoid scratching",
      "Get regular checkups",
    ],
    dos: [
      "Do moisturize daily",
      "Do use mild products",
      "Do manage stress",
      "Do keep skin clean",
      "Do follow treatment plan",
    ],
    donts: [
      "Don't scratch skin",
      "Don't use harsh soaps",
      "Don't expose to irritants",
      "Don't take hot baths",
      "Don't ignore flare-ups",
    ],
  },
  "Urinary Tract Infection": {
    medicines: [
      {
        name: "Ciprofloxacin",
        dosage: "500mg",
        frequency: "Twice daily",
        duration: "5-7 days",
        sideEffects: "Nausea, dizziness",
      },
      {
        name: "Nitrofurantoin",
        dosage: "100mg",
        frequency: "Twice daily",
        duration: "5-7 days",
        sideEffects: "Nausea, brown urine",
      },
    ],
    homeRemedies: [
      "Drink plenty of water",
      "Cranberry juice",
      "Warm compress on abdomen",
      "Avoid irritants",
      "Urinate frequently",
      "Maintain hygiene",
      "Wear cotton underwear",
    ],
    precautions: [
      "Drink plenty of water",
      "Urinate regularly",
      "Maintain genital hygiene",
      "Avoid irritants",
      "Wipe front to back",
      "Avoid tight clothing",
      "Empty bladder completely",
      "Get regular checkups",
    ],
    dos: [
      "Do drink water",
      "Do urinate regularly",
      "Do maintain hygiene",
      "Do take antibiotics",
      "Do seek medical help",
    ],
    donts: [
      "Don't hold urine",
      "Don't use irritants",
      "Don't wear tight clothing",
      "Don't ignore symptoms",
      "Don't skip antibiotics",
    ],
  },
  Bronchitis: {
    medicines: [
      {
        name: "Albuterol",
        dosage: "2-4 puffs",
        frequency: "Every 4-6 hours",
        duration: "As needed",
        sideEffects: "Tremor, nervousness",
      },
      {
        name: "Guaifenesin",
        dosage: "200-400mg",
        frequency: "Every 4 hours",
        duration: "Until resolved",
        sideEffects: "Nausea, vomiting",
      },
    ],
    homeRemedies: [
      "Rest adequately",
      "Drink warm fluids",
      "Steam inhalation",
      "Honey and lemon",
      "Ginger tea",
      "Avoid smoke",
      "Use humidifier",
    ],
    precautions: [
      "Avoid smoke and pollution",
      "Stay hydrated",
      "Get adequate rest",
      "Avoid cold air",
      "Maintain good hygiene",
      "Avoid respiratory irritants",
      "Get flu vaccination",
      "Monitor symptoms",
    ],
    dos: ["Do rest adequately", "Do drink fluids", "Do use humidifier", "Do avoid smoke", "Do monitor cough"],
    donts: [
      "Don't smoke",
      "Don't exercise strenuously",
      "Don't ignore persistent cough",
      "Don't expose to pollution",
      "Don't skip rest",
    ],
  },
  Asthma: {
    medicines: [
      {
        name: "Albuterol Inhaler",
        dosage: "2 puffs",
        frequency: "Every 4-6 hours",
        duration: "As needed",
        sideEffects: "Tremor, nervousness",
      },
      {
        name: "Fluticasone",
        dosage: "110-220 mcg",
        frequency: "Twice daily",
        duration: "Long-term",
        sideEffects: "Throat irritation",
      },
    ],
    homeRemedies: [
      "Avoid triggers",
      "Regular exercise",
      "Breathing exercises",
      "Maintain clean environment",
      "Avoid allergens",
      "Stay hydrated",
      "Manage stress",
    ],
    precautions: [
      "Identify and avoid triggers",
      "Keep rescue inhaler handy",
      "Maintain clean environment",
      "Avoid allergens",
      "Exercise regularly",
      "Manage stress",
      "Get regular checkups",
      "Monitor peak flow",
    ],
    dos: [
      "Do use inhalers correctly",
      "Do avoid triggers",
      "Do exercise regularly",
      "Do keep rescue inhaler",
      "Do attend checkups",
    ],
    donts: [
      "Don't ignore symptoms",
      "Don't skip medications",
      "Don't expose to triggers",
      "Don't exercise in pollution",
      "Don't delay treatment",
    ],
  },
  Dehydration: {
    medicines: [
      {
        name: "Oral Rehydration Solution (ORS)",
        dosage: "As directed",
        frequency: "Every 15-30 minutes",
        duration: "Until rehydrated",
        sideEffects: "None when used as directed",
      },
      {
        name: "Electrolyte Solutions",
        dosage: "As needed",
        frequency: "Throughout the day",
        duration: "Until symptoms resolve",
        sideEffects: "May cause mild stomach upset",
      },
    ],
    homeRemedies: [
      "Drink plenty of water (8-10 glasses daily)",
      "Consume water-rich foods (watermelon, cucumber)",
      "Drink coconut water",
      "Avoid caffeine and alcohol",
      "Eat bananas and oranges",
      "Rest in cool environment",
      "Monitor urine color (should be light yellow)",
    ],
    precautions: [
      "Monitor fluid intake carefully",
      "Avoid strenuous activity in hot weather",
      "Check for signs of severe dehydration",
      "Seek medical help if symptoms persist",
      "Maintain electrolyte balance",
      "Avoid sugary drinks",
      "Stay in cool, shaded areas",
      "Wear loose, light clothing",
    ],
    dos: [
      "Do drink water regularly",
      "Do consume electrolyte-rich foods",
      "Do rest in cool places",
      "Do monitor urine output",
      "Do eat water-rich fruits",
    ],
    donts: [
      "Don't ignore thirst",
      "Don't consume alcohol",
      "Don't exercise in extreme heat",
      "Don't wait until severely thirsty",
      "Don't ignore dark urine",
    ],
  },
  "Low Blood Pressure": {
    medicines: [
      {
        name: "Fludrocortisone",
        dosage: "0.1-0.2mg",
        frequency: "Once daily",
        duration: "As prescribed",
        sideEffects: "High blood pressure, swelling",
      },
      {
        name: "Midodrine",
        dosage: "2.5-10mg",
        frequency: "Three times daily",
        duration: "As prescribed",
        sideEffects: "Goosebumps, urinary retention",
      },
    ],
    homeRemedies: [
      "Increase salt intake (with doctor's approval)",
      "Stay well hydrated",
      "Wear compression stockings",
      "Avoid sudden position changes",
      "Eat small, frequent meals",
      "Limit alcohol consumption",
      "Exercise regularly (with guidance)",
    ],
    precautions: [
      "Monitor blood pressure regularly",
      "Avoid prolonged standing",
      "Be cautious when getting up",
      "Maintain healthy diet",
      "Manage stress levels",
      "Get adequate sleep",
      "Avoid hot showers",
      "Consult doctor before starting exercise",
    ],
    dos: [
      "Do rise slowly from sitting/lying",
      "Do stay hydrated",
      "Do eat regular meals",
      "Do monitor blood pressure",
      "Do exercise appropriately",
    ],
    donts: [
      "Don't stand for long periods",
      "Don't skip meals",
      "Don't take hot baths",
      "Don't ignore dizziness",
      "Don't over-exercise",
    ],
  },
  "Eye Strain": {
    medicines: [
      {
        name: "Artificial Tears",
        dosage: "1-2 drops",
        frequency: "As needed",
        duration: "Until symptoms resolve",
        sideEffects: "Temporary blurring of vision",
      },
      {
        name: "Lubricating Eye Drops",
        dosage: "1-2 drops",
        frequency: "4-6 times daily",
        duration: "As needed",
        sideEffects: "Minimal side effects",
      },
    ],
    homeRemedies: [
      "Follow 20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds)",
      "Adjust screen brightness and contrast",
      "Use proper lighting",
      "Take regular breaks from screens",
      "Blink frequently",
      "Use anti-glare screens",
      "Maintain proper posture",
    ],
    precautions: [
      "Maintain proper screen distance (18-24 inches)",
      "Ensure adequate lighting",
      "Take regular breaks from digital devices",
      "Keep screens clean",
      "Use appropriate font sizes",
      "Maintain good posture",
      "Get regular eye exams",
      "Stay hydrated",
    ],
    dos: [
      "Do take screen breaks",
      "Do maintain proper distance",
      "Do use good lighting",
      "Do blink regularly",
      "Do get eye exams",
    ],
    donts: [
      "Don't stare at screens continuously",
      "Don't use devices in dark",
      "Don't ignore eye discomfort",
      "Don't use expired eye drops",
      "Don't rub eyes excessively",
    ],
  },
  Vertigo: {
    medicines: [
      {
        name: "Meclizine",
        dosage: "25-50mg",
        frequency: "Every 6-8 hours",
        duration: "As needed",
        sideEffects: "Drowsiness, dry mouth",
      },
      {
        name: "Dimenhydrinate",
        dosage: "50mg",
        frequency: "Every 4-6 hours",
        duration: "As needed",
        sideEffects: "Drowsiness, dizziness",
      },
      {
        name: "Betahistine",
        dosage: "8-16mg",
        frequency: "Three times daily",
        duration: "As prescribed",
        sideEffects: "Nausea, headache",
      },
    ],
    homeRemedies: [
      "Practice Epley maneuver (for BPPV)",
      "Stay hydrated",
      "Avoid sudden head movements",
      "Use supportive pillows",
      "Practice balance exercises",
      "Get adequate rest",
      "Reduce salt intake",
    ],
    precautions: [
      "Avoid driving if dizzy",
      "Use handrails when walking",
      "Avoid heights and ladders",
      "Get up slowly from bed",
      "Maintain regular sleep schedule",
      "Avoid alcohol and caffeine",
      "Stay physically active",
      "Monitor symptoms carefully",
    ],
    dos: [
      "Do move slowly and carefully",
      "Do use support when walking",
      "Do stay hydrated",
      "Do practice balance exercises",
      "Do rest when dizzy",
    ],
    donts: [
      "Don't drive when dizzy",
      "Don't look up suddenly",
      "Don't ignore severe symptoms",
      "Don't consume alcohol",
      "Don't skip meals",
    ],
  },
  Allergies: {
    medicines: [
      {
        name: "Cetirizine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "As needed",
        sideEffects: "Drowsiness, dry mouth",
      },
      {
        name: "Loratadine",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "As needed",
        sideEffects: "Minimal side effects",
      },
      {
        name: "Fexofenadine",
        dosage: "180mg",
        frequency: "Once daily",
        duration: "As needed",
        sideEffects: "Rare, generally well-tolerated",
      },
      {
        name: "Fluticasone Nasal Spray",
        dosage: "2 sprays per nostril",
        frequency: "Once daily",
        duration: "As needed",
        sideEffects: "Nasal irritation, nosebleeds",
      },
    ],
    homeRemedies: [
      "Use air purifiers",
      "Keep windows closed during high pollen",
      "Shower after being outdoors",
      "Use allergen-proof bedding",
      "Avoid outdoor activities during peak pollen",
      "Keep indoor humidity low",
      "Regular vacuuming with HEPA filter",
    ],
    precautions: [
      "Identify and avoid specific allergens",
      "Keep emergency medications available",
      "Monitor weather and pollen counts",
      "Use protective clothing outdoors",
      "Maintain clean indoor environment",
      "Avoid smoking and secondhand smoke",
      "Get allergy testing if symptoms persist",
      "Carry epinephrine auto-injector if severe",
    ],
    dos: [
      "Do identify your triggers",
      "Do take medications as prescribed",
      "Do keep environment clean",
      "Do use air filtration",
      "Do shower after outdoor exposure",
    ],
    donts: [
      "Don't ignore symptoms",
      "Don't expose yourself to known allergens",
      "Don't skip medications during allergy season",
      "Don't use outdated medications",
      "Don't rely only on home remedies for severe allergies",
    ],
  },
  "Acid Reflux": {
    medicines: [
      {
        name: "Omeprazole",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "4-8 weeks",
        sideEffects: "Headache, diarrhea, abdominal pain",
      },
      {
        name: "Ranitidine",
        dosage: "150mg",
        frequency: "Twice daily",
        duration: "As needed",
        sideEffects: "Headache, dizziness, constipation",
      },
      {
        name: "Antacids (Calcium Carbonate)",
        dosage: "500-1000mg",
        frequency: "As needed",
        duration: "Until symptoms resolve",
        sideEffects: "Constipation, gas",
      },
      {
        name: "Gaviscon",
        dosage: "1-2 tablets",
        frequency: "After meals and bedtime",
        duration: "As needed",
        sideEffects: "Mild constipation",
      },
    ],
    homeRemedies: [
      "Eat smaller, more frequent meals",
      "Avoid lying down after eating (wait 3 hours)",
      "Elevate head of bed (6-8 inches)",
      "Avoid trigger foods (spicy, fatty, acidic)",
      "Chew gum to increase saliva",
      "Drink ginger tea",
      "Eat slowly and chew thoroughly",
    ],
    precautions: [
      "Avoid eating 3 hours before bedtime",
      "Maintain healthy weight",
      "Avoid tight clothing around waist",
      "Limit alcohol and caffeine",
      "Stop smoking",
      "Monitor symptoms and triggers",
      "Seek medical help if symptoms worsen",
      "Consider dietary changes",
    ],
    dos: [
      "Do eat smaller meals",
      "Do elevate head while sleeping",
      "Do avoid trigger foods",
      "Do maintain healthy weight",
      "Do eat slowly",
    ],
    donts: [
      "Don't lie down after eating",
      "Don't eat large meals",
      "Don't consume trigger foods",
      "Don't wear tight clothing",
      "Don't ignore persistent symptoms",
    ],
  },
  "COVID-19": {
    medicines: [
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Every 6-8 hours",
        duration: "5-7 days",
        sideEffects: "Rare, generally well-tolerated",
      },
      {
        name: "Vitamin D Supplements",
        dosage: "2000 IU",
        frequency: "Daily",
        duration: "During illness",
        sideEffects: "Generally safe",
      },
    ],
    homeRemedies: [
      "Complete isolation for 10-14 days",
      "Drink plenty of fluids",
      "Rest and sleep adequately",
      "Monitor oxygen levels",
      "Steam inhalation",
      "Warm soup and broths",
      "Vitamin C rich foods",
    ],
    precautions: [
      "Quarantine for 14 days",
      "Wear mask at all times",
      "Monitor symptoms closely",
      "Seek emergency care if breathing worsens",
      "Maintain social distancing",
      "Disinfect surfaces regularly",
      "Get vaccinated when available",
      "Follow public health guidelines",
    ],
    dos: [
      "Do isolate immediately",
      "Do monitor symptoms",
      "Do stay hydrated",
      "Do rest adequately",
      "Do seek medical help if needed",
    ],
    donts: [
      "Don't go out in public",
      "Don't share personal items",
      "Don't ignore worsening symptoms",
      "Don't self-medicate",
      "Don't panic",
    ],
  },
  "Anemia": {
    medicines: [
      {
        name: "Iron Supplements",
        dosage: "65mg",
        frequency: "Once daily",
        duration: "3-6 months",
        sideEffects: "Constipation, stomach upset",
      },
      {
        name: "Vitamin B12",
        dosage: "1000mcg",
        frequency: "Daily",
        duration: "As prescribed",
        sideEffects: "Generally safe",
      },
      {
        name: "Folic Acid",
        dosage: "400mcg",
        frequency: "Daily",
        duration: "As prescribed",
        sideEffects: "Rare side effects",
      },
    ],
    homeRemedies: [
      "Iron-rich foods (red meat, spinach, beans)",
      "Vitamin C with meals to enhance iron absorption",
      "Avoid tea/coffee with meals",
      "Regular exercise",
      "Adequate sleep",
      "Stress management",
    ],
    precautions: [
      "Get regular blood tests",
      "Monitor hemoglobin levels",
      "Take iron with vitamin C",
      "Avoid calcium supplements with iron",
      "Maintain healthy diet",
      "Get adequate rest",
      "Manage underlying conditions",
    ],
    dos: [
      "Do eat iron-rich foods",
      "Do take supplements as prescribed",
      "Do exercise regularly",
      "Do get regular checkups",
      "Do manage stress",
    ],
    donts: [
      "Don't ignore fatigue",
      "Don't skip meals",
      "Don't drink tea/coffee with iron",
      "Don't take calcium with iron",
      "Don't self-diagnose",
    ],
  },
  "Depression": {
    medicines: [
      {
        name: "Sertraline",
        dosage: "50mg",
        frequency: "Once daily",
        duration: "6-12 months",
        sideEffects: "Nausea, insomnia, sexual dysfunction",
      },
      {
        name: "Escitalopram",
        dosage: "10mg",
        frequency: "Once daily",
        duration: "6-12 months",
        sideEffects: "Nausea, fatigue, anxiety",
      },
    ],
    homeRemedies: [
      "Regular exercise (30 minutes daily)",
      "Healthy diet with omega-3 fatty acids",
      "Adequate sleep (7-9 hours)",
      "Social connections and support",
      "Mindfulness and meditation",
      "Journaling",
      "Sunlight exposure",
    ],
    precautions: [
      "Seek professional mental health support",
      "Monitor for suicidal thoughts",
      "Avoid alcohol and drugs",
      "Maintain medication schedule",
      "Regular therapy sessions",
      "Build support network",
      "Set realistic goals",
      "Practice self-care",
    ],
    dos: [
      "Do seek professional help",
      "Do exercise regularly",
      "Do maintain social connections",
      "Do practice mindfulness",
      "Do get adequate sleep",
    ],
    donts: [
      "Don't isolate yourself",
      "Don't use alcohol to cope",
      "Don't ignore symptoms",
      "Don't stop medication abruptly",
      "Don't neglect self-care",
    ],
  },
  "Anxiety": {
    medicines: [
      {
        name: "Alprazolam",
        dosage: "0.25-0.5mg",
        frequency: "As needed",
        duration: "Short-term",
        sideEffects: "Drowsiness, confusion, dependence",
      },
      {
        name: "Sertraline",
        dosage: "50mg",
        frequency: "Once daily",
        duration: "Long-term",
        sideEffects: "Nausea, insomnia, sexual dysfunction",
      },
    ],
    homeRemedies: [
      "Deep breathing exercises",
      "Progressive muscle relaxation",
      "Regular exercise",
      "Healthy sleep habits",
      "Balanced diet",
      "Limiting caffeine",
      "Journaling",
    ],
    precautions: [
      "Seek professional mental health support",
      "Avoid alcohol and sedatives",
      "Monitor anxiety triggers",
      "Practice stress management",
      "Maintain medication schedule",
      "Build coping strategies",
      "Get regular checkups",
    ],
    dos: [
      "Do practice relaxation techniques",
      "Do exercise regularly",
      "Do maintain healthy lifestyle",
      "Do seek professional help",
      "Do identify triggers",
    ],
    donts: [
      "Don't avoid anxiety-provoking situations",
      "Don't use alcohol to cope",
      "Don't ignore symptoms",
      "Don't stop medication abruptly",
      "Don't isolate yourself",
    ],
  },
  "Insomnia": {
    medicines: [
      {
        name: "Melatonin",
        dosage: "3-5mg",
        frequency: "30 minutes before bed",
        duration: "Short-term",
        sideEffects: "Drowsiness, headache",
      },
      {
        name: "Zolpidem",
        dosage: "5-10mg",
        frequency: "At bedtime",
        duration: "Short-term",
        sideEffects: "Drowsiness, dizziness, dependence",
      },
    ],
    homeRemedies: [
      "Maintain consistent sleep schedule",
      "Create relaxing bedtime routine",
      "Keep bedroom cool and dark",
      "Avoid screens 1 hour before bed",
      "Limit caffeine after noon",
      "Regular exercise (not before bed)",
      "Relaxation techniques",
    ],
    precautions: [
      "Establish good sleep hygiene",
      "Avoid daytime napping",
      "Limit alcohol and caffeine",
      "Create sleep-conducive environment",
      "Manage stress effectively",
      "Get regular exercise",
      "Avoid heavy meals before bed",
    ],
    dos: [
      "Do maintain sleep schedule",
      "Do create bedtime routine",
      "Do exercise regularly",
      "Do limit caffeine",
      "Do relax before bed",
    ],
    donts: [
      "Don't use screens in bed",
      "Don't nap during day",
      "Don't consume caffeine late",
      "Don't eat heavy meals late",
      "Don't worry about sleep",
    ],
  },
  "Pneumonia": {
    medicines: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "7-10 days",
        sideEffects: "Nausea, diarrhea, rash",
      },
      {
        name: "Azithromycin",
        dosage: "500mg",
        frequency: "Once daily",
        duration: "3-5 days",
        sideEffects: "Nausea, diarrhea, abdominal pain",
      },
    ],
    homeRemedies: [
      "Complete bed rest",
      "Stay well hydrated",
      "Use humidifier",
      "Gargle with salt water",
      "Elevate head while sleeping",
      "Avoid smoke and pollution",
      "Nutritious diet",
    ],
    precautions: [
      "Complete full course of antibiotics",
      "Monitor temperature regularly",
      "Get plenty of rest",
      "Avoid contact with others",
      "Watch for worsening symptoms",
      "Get vaccinated against pneumonia",
      "Maintain good hygiene",
    ],
    dos: [
      "Do complete antibiotic course",
      "Do rest adequately",
      "Do stay hydrated",
      "Do monitor symptoms",
      "Do seek medical help if worsens",
    ],
    donts: [
      "Don't stop antibiotics early",
      "Don't go to work or school",
      "Don't ignore chest pain",
      "Don't smoke",
      "Don't delay treatment",
    ],
  },
  "Heartburn": {
    medicines: [
      {
        name: "Omeprazole",
        dosage: "20mg",
        frequency: "Once daily",
        duration: "4-8 weeks",
        sideEffects: "Headache, diarrhea, abdominal pain",
      },
      {
        name: "Antacids",
        dosage: "As needed",
        frequency: "After meals",
        duration: "Until symptoms resolve",
        sideEffects: "Constipation, gas",
      },
    ],
    homeRemedies: [
      "Eat smaller meals",
      "Avoid lying down after eating",
      "Elevate head of bed",
      "Avoid trigger foods",
      "Chew gum after meals",
      "Drink ginger tea",
      "Eat slowly",
    ],
    precautions: [
      "Avoid eating before bedtime",
      "Maintain healthy weight",
      "Avoid tight clothing",
      "Limit alcohol and caffeine",
      "Stop smoking",
      "Monitor symptoms",
      "Seek medical help if persistent",
    ],
    dos: [
      "Do eat smaller meals",
      "Do elevate head while sleeping",
      "Do avoid trigger foods",
      "Do maintain healthy weight",
      "Do eat slowly",
    ],
    donts: [
      "Don't lie down after eating",
      "Don't eat large meals",
      "Don't consume trigger foods",
      "Don't wear tight clothing",
      "Don't ignore persistent symptoms",
    ],
  },
  "Muscle Strain": {
    medicines: [
      {
        name: "Ibuprofen",
        dosage: "400mg",
        frequency: "Every 6-8 hours",
        duration: "3-5 days",
        sideEffects: "Stomach upset, take with food",
      },
      {
        name: "Paracetamol",
        dosage: "500mg",
        frequency: "Every 6-8 hours",
        duration: "3-5 days",
        sideEffects: "Rare, generally well-tolerated",
      },
    ],
    homeRemedies: [
      "Rest the affected muscle",
      "Apply ice for 15-20 minutes",
      "Use compression bandage",
      "Elevate the injured area",
      "Gentle stretching after 48 hours",
      "Warm compress after 72 hours",
      "Massage therapy",
    ],
    precautions: [
      "Avoid activities that cause pain",
      "Use proper form during exercise",
      "Warm up before physical activity",
      "Strengthen supporting muscles",
      "Maintain flexibility",
      "Get adequate rest",
      "Seek medical help if no improvement",
    ],
    dos: [
      "Do rest the injured area",
      "Do apply ice initially",
      "Do use compression",
      "Do elevate when possible",
      "Do gentle stretching later",
    ],
    donts: [
      "Don't continue painful activities",
      "Don't apply heat initially",
      "Don't ignore severe pain",
      "Don't delay treatment",
      "Don't overstretch",
    ],
  },
  "Post-nasal Drip": {
    medicines: [
      {
        name: "Guaifenesin",
        dosage: "200-400mg",
        frequency: "Every 4 hours",
        duration: "Until resolved",
        sideEffects: "Nausea, vomiting",
      },
      {
        name: "Fluticasone Nasal Spray",
        dosage: "2 sprays per nostril",
        frequency: "Once daily",
        duration: "As needed",
        sideEffects: "Nasal irritation, nosebleeds",
      },
    ],
    homeRemedies: [
      "Use humidifier",
      "Stay hydrated",
      "Gargle with salt water",
      "Use saline nasal spray",
      "Elevate head while sleeping",
      "Avoid irritants",
      "Steam inhalation",
    ],
    precautions: [
      "Avoid allergens",
      "Keep indoor air clean",
      "Use air purifier",
      "Avoid smoke and pollution",
      "Maintain good hygiene",
      "Monitor symptoms",
      "Seek medical help if persistent",
    ],
    dos: [
      "Do use humidifier",
      "Do stay hydrated",
      "Do use nasal spray",
      "Do avoid irritants",
      "Do elevate head",
    ],
    donts: [
      "Don't ignore persistent symptoms",
      "Don't expose to smoke",
      "Don't use decongestants long-term",
      "Don't delay treatment",
      "Don't ignore allergies",
    ],
  },
  "Motion Sickness": {
    medicines: [
      {
        name: "Dimenhydrinate",
        dosage: "50mg",
        frequency: "Every 4-6 hours",
        duration: "As needed",
        sideEffects: "Drowsiness, dry mouth",
      },
      {
        name: "Meclizine",
        dosage: "25mg",
        frequency: "1 hour before travel",
        duration: "As needed",
        sideEffects: "Drowsiness, dry mouth",
      },
    ],
    homeRemedies: [
      "Sit in front seat during travel",
      "Keep eyes on horizon",
      "Get fresh air",
      "Ginger tea or supplements",
      "Acupressure bands",
      "Avoid heavy meals before travel",
      "Stay hydrated",
    ],
    precautions: [
      "Plan travel carefully",
      "Avoid reading during travel",
      "Take medication before symptoms start",
      "Choose less bumpy routes",
      "Avoid alcohol before travel",
      "Get adequate rest",
      "Monitor for dehydration",
    ],
    dos: [
      "Do take medication early",
      "Do sit in front seat",
      "Do look at horizon",
      "Do get fresh air",
      "Do use ginger",
    ],
    donts: [
      "Don't read during travel",
      "Don't sit in back seat",
      "Don't eat heavy meals",
      "Don't consume alcohol",
      "Don't ignore symptoms",
    ],
  },
  "Strep Throat": {
    medicines: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "Three times daily",
        duration: "10 days",
        sideEffects: "Nausea, diarrhea, rash",
      },
      {
        name: "Penicillin",
        dosage: "500mg",
        frequency: "Four times daily",
        duration: "10 days",
        sideEffects: "Nausea, vomiting, diarrhea",
      },
    ],
    homeRemedies: [
      "Gargle with warm salt water",
      "Drink warm fluids (tea, soup)",
      "Use throat lozenges",
      "Get plenty of rest",
      "Stay hydrated",
      "Avoid irritants (smoke, pollution)",
    ],
    precautions: [
      "Complete full course of antibiotics",
      "Avoid close contact with others",
      "Wash hands frequently",
      "Avoid sharing utensils",
      "Monitor for complications",
      "Get plenty of rest",
      "Stay hydrated",
    ],
    dos: [
      "Do complete antibiotic course",
      "Do rest adequately",
      "Do stay hydrated",
      "Do gargle with salt water",
      "Do isolate from others",
    ],
    donts: [
      "Don't stop antibiotics early",
      "Don't share personal items",
      "Don't go to work or school",
      "Don't ignore severe pain",
      "Don't delay treatment",
    ],
  },
  "Food Poisoning": {
    medicines: [
      {
        name: "Oral Rehydration Solution",
        dosage: "As directed",
        frequency: "Frequently",
        duration: "Until hydrated",
        sideEffects: "None when used properly",
      },
      {
        name: "Loperamide",
        dosage: "2mg",
        frequency: "After loose stool",
        duration: "Until symptoms resolve",
        sideEffects: "Constipation if overused",
      },
    ],
    homeRemedies: [
      "Stay well hydrated",
      "Eat bland foods (rice, bananas, toast)",
      "Small, frequent meals",
      "Ginger tea",
      "Rest adequately",
      "Avoid dairy and fatty foods",
    ],
    precautions: [
      "Monitor for dehydration signs",
      "Avoid preparing food for others",
      "Wash hands frequently",
      "Clean contaminated surfaces",
      "Seek medical help if severe",
      "Get plenty of rest",
      "Maintain hygiene",
    ],
    dos: [
      "Do stay hydrated",
      "Do eat bland foods",
      "Do rest adequately",
      "Do monitor symptoms",
      "Do maintain hygiene",
    ],
    donts: [
      "Don't eat contaminated food",
      "Don't prepare food for others",
      "Don't ignore severe symptoms",
      "Don't use antibiotics without prescription",
      "Don't delay medical care if needed",
    ],
  },
  "Indigestion": {
    medicines: [
      {
        name: "Antacids",
        dosage: "As needed",
        frequency: "After meals",
        duration: "Until symptoms resolve",
        sideEffects: "Constipation, gas",
      },
      {
        name: "Simethicone",
        dosage: "125mg",
        frequency: "As needed",
        duration: "Until symptoms resolve",
        sideEffects: "Generally safe",
      },
    ],
    homeRemedies: [
      "Eat smaller, more frequent meals",
      "Avoid lying down after eating",
      "Drink peppermint tea",
      "Chew food thoroughly",
      "Avoid trigger foods",
      "Stay upright after meals",
    ],
    precautions: [
      "Identify and avoid trigger foods",
      "Eat slowly and chew thoroughly",
      "Avoid eating before bedtime",
      "Maintain healthy weight",
      "Limit alcohol and caffeine",
      "Manage stress",
    ],
    dos: [
      "Do eat smaller meals",
      "Do chew food thoroughly",
      "Do avoid trigger foods",
      "Do maintain healthy weight",
      "Do manage stress",
    ],
    donts: [
      "Don't eat large meals",
      "Don't lie down after eating",
      "Don't consume trigger foods",
      "Don't eat quickly",
      "Don't ignore persistent symptoms",
    ],
  },
  "Fibromyalgia": {
    medicines: [
      {
        name: "Duloxetine",
        dosage: "30-60mg",
        frequency: "Once daily",
        duration: "Long-term",
        sideEffects: "Nausea, dry mouth, fatigue",
      },
      {
        name: "Pregabalin",
        dosage: "75-150mg",
        frequency: "Twice daily",
        duration: "Long-term",
        sideEffects: "Dizziness, drowsiness, weight gain",
      },
    ],
    homeRemedies: [
      "Regular low-impact exercise",
      "Stress management techniques",
      "Adequate sleep hygiene",
      "Hot and cold therapy",
      "Massage therapy",
      "Yoga and stretching",
      "Balanced diet",
    ],
    precautions: [
      "Start exercise gradually",
      "Manage stress effectively",
      "Maintain good sleep habits",
      "Monitor symptoms",
      "Regular medical checkups",
      "Avoid overexertion",
      "Build support network",
    ],
    dos: [
      "Do exercise regularly",
      "Do manage stress",
      "Do get adequate sleep",
      "Do practice relaxation",
      "Do maintain healthy lifestyle",
    ],
    donts: [
      "Don't overexert yourself",
      "Don't ignore pain",
      "Don't skip medications",
      "Don't isolate yourself",
      "Don't neglect mental health",
    ],
  },
  "Chronic Fatigue Syndrome": {
    medicines: [
      {
        name: "Cognitive Behavioral Therapy",
        dosage: "As prescribed",
        frequency: "Weekly sessions",
        duration: "6-12 months",
        sideEffects: "Temporary increase in symptoms",
      },
      {
        name: "Graded Exercise Therapy",
        dosage: "As prescribed",
        frequency: "Guided program",
        duration: "3-6 months",
        sideEffects: "Temporary fatigue increase",
      },
    ],
    homeRemedies: [
      "Pace daily activities",
      "Maintain consistent sleep schedule",
      "Balanced nutrition",
      "Stress management",
      "Light exercise as tolerated",
      "Social support",
      "Relaxation techniques",
    ],
    precautions: [
      "Work with healthcare providers",
      "Monitor activity levels",
      "Avoid overexertion",
      "Manage stress effectively",
      "Get regular medical care",
      "Build support system",
      "Track symptoms",
    ],
    dos: [
      "Do pace activities",
      "Do maintain sleep schedule",
      "Do manage stress",
      "Do get support",
      "Do follow medical advice",
    ],
    donts: [
      "Don't push through severe fatigue",
      "Don't ignore symptoms",
      "Don't overcommit",
      "Don't isolate yourself",
      "Don't self-diagnose",
    ],
  },
  "Hypothyroidism": {
    medicines: [
      {
        name: "Levothyroxine",
        dosage: "25-150mcg",
        frequency: "Once daily",
        duration: "Long-term",
        sideEffects: "Rare when dose is correct",
      },
      {
        name: "Liothyronine",
        dosage: "5-25mcg",
        frequency: "Once daily",
        duration: "As prescribed",
        sideEffects: "Heart palpitations, anxiety",
      },
    ],
    homeRemedies: [
      "Balanced diet with iodine",
      "Regular exercise",
      "Stress management",
      "Adequate sleep",
      "Maintain healthy weight",
      "Regular medical monitoring",
      "Selenium-rich foods",
    ],
    precautions: [
      "Take medication consistently",
      "Regular blood tests",
      "Monitor thyroid function",
      "Maintain healthy lifestyle",
      "Inform doctors of condition",
      "Avoid certain supplements",
      "Get regular checkups",
    ],
    dos: [
      "Do take medication daily",
      "Do get regular blood tests",
      "Do maintain healthy lifestyle",
      "Do monitor symptoms",
      "Do follow medical advice",
    ],
    donts: [
      "Don't skip medications",
      "Don't take with certain supplements",
      "Don't ignore symptoms",
      "Don't self-adjust dose",
      "Don't neglect follow-ups",
    ],
  },
}

interface Treatment {
  medicines: Medicine[]
  homeRemedies: string[]
  precautions: string[]
  dos: string[]
  donts: string[]
}

export default function SymptomAnalyzer() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<Symptom[]>([])
  const [searchInput, setSearchInput] = useState("")
  const [diagnosisResults, setDiagnosisResults] = useState<DiagnosisResult[]>([])
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null)
  const [savedRecords, setSavedRecords] = useState<string[]>([])

  const filteredSymptoms = COMMON_SYMPTOMS.filter(
    (symptom) =>
      symptom.toLowerCase().includes(searchInput.toLowerCase()) && !selectedSymptoms.some((s) => s.name === symptom),
  )

  const addSymptom = (symptomName: string) => {
    const newSymptom: Symptom = {
      id: Date.now().toString(),
      name: symptomName,
    }
    setSelectedSymptoms([...selectedSymptoms, newSymptom])
    setSearchInput("")
  }

  const removeSymptom = (id: string) => {
    setSelectedSymptoms(selectedSymptoms.filter((s) => s.id !== id))
  }

  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return

    const selectedSymptomNames = selectedSymptoms.map((s) => s.name)
    const allResults: DiagnosisResult[] = []
    const conditionScores = new Map<string, number>()

    // First, try exact match
    const exactKey = selectedSymptomNames.sort().join(",")
    if (DIAGNOSIS_DATABASE[exactKey]) {
      DIAGNOSIS_DATABASE[exactKey].forEach(result => {
        conditionScores.set(result.condition, result.probability)
        allResults.push(result)
      })
    }

    // Always try single symptom matches for each selected symptom
    selectedSymptomNames.forEach((symptom) => {
      if (DIAGNOSIS_DATABASE[symptom]) {
        DIAGNOSIS_DATABASE[symptom].forEach((result) => {
          const currentScore = conditionScores.get(result.condition) || 0
          const newScore = Math.max(currentScore, result.probability * 0.9)
          conditionScores.set(result.condition, newScore)

          const existingResult = allResults.find((r) => r.condition === result.condition)
          if (existingResult) {
            existingResult.probability = newScore
          } else {
            allResults.push({
              ...result,
              probability: newScore,
            })
          }
        })
      }
    })

    // Add partial matches from combinations for additional diversity
    Object.entries(DIAGNOSIS_DATABASE).forEach(([key, results]) => {
      const dbSymptoms = key.split(",")
      const matchCount = selectedSymptomNames.filter((s) => dbSymptoms.includes(s)).length

      if (matchCount > 0 && matchCount < dbSymptoms.length) {
        results.forEach((result) => {
          const currentScore = conditionScores.get(result.condition) || 0
          const partialScore = (result.probability * matchCount) / dbSymptoms.length * 0.8
          const newScore = Math.max(currentScore, partialScore)
          conditionScores.set(result.condition, newScore)

          const existingResult = allResults.find((r) => r.condition === result.condition)
          if (existingResult) {
            existingResult.probability = newScore
          } else {
            allResults.push({
              ...result,
              probability: newScore,
            })
          }
        })
      }
    })

    // Sort by probability and remove duplicates, ensuring diversity
    const uniqueResults = Array.from(new Map(allResults.map((r) => [r.condition, r])).values())
      .sort((a, b) => b.probability - a.probability)
      .slice(0, 6)

    setDiagnosisResults(uniqueResults.length > 0 ? uniqueResults : [])
    setSelectedCondition(null)

    // Scroll to results after a brief delay to allow DOM update
    setTimeout(() => {
      const resultsElement = document.getElementById('diagnosis-results')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, 100)
  }

  const getTreatment = (condition: string): Treatment | null => {
    return TREATMENT_DATABASE[condition] || null
  }

  const saveToHealthRecord = () => {
    if (selectedCondition) {
      const record = `${new Date().toLocaleDateString()}: ${selectedCondition} - Symptoms: ${selectedSymptoms.map((s) => s.name).join(", ")}`
      setSavedRecords([...savedRecords, record])
      alert("Diagnosis saved to your health profile!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Smart Analysis</h1>
          </div>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Get instant health insights with our AI-powered analysis system. Receive personalized treatment
            recommendations, medication guidance, and health management tools.
          </p>
        </div>

        <div className="space-y-6">
          {/* Symptom Input Section */}
          <div>
            <div className="bg-gradient-to-br from-card via-card to-primary/5 rounded-3xl shadow-xl p-8 border border-border/50 sticky top-24 space-y-8 backdrop-blur-sm">

              {/* Header Section */}
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">Analysis</h2>
                  <p className="text-sm text-foreground/60">Select your symptoms for accurate analysis</p>
                </div>
              </div>

              {/* Enhanced Search Input */}
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-foreground/80">Search Symptoms</label>
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    placeholder="Type to search symptoms..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-input/50 border-2 border-border/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-sm placeholder:text-foreground/40 transition-all duration-300"
                  />
                  {searchInput && (
                    <button
                      onClick={() => setSearchInput("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-foreground/10 hover:bg-foreground/20 flex items-center justify-center transition-colors"
                    >
                      <X size={14} className="text-foreground/60" />
                    </button>
                  )}
                </div>
              </div>

              {/* Enhanced Symptom Suggestions */}
              {searchInput && filteredSymptoms.length > 0 && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground/70">Suggestions</p>
                  <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
                    {filteredSymptoms.map((symptom, index) => (
                      <button
                        key={`${symptom}-${index}`}
                        onClick={() => addSymptom(symptom)}
                        className="w-full text-left p-3 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 text-primary rounded-xl transition-all duration-200 group border border-primary/20 hover:border-primary/40"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                            <span className="text-xs font-bold text-primary">+</span>
                          </div>
                          <span className="font-medium">{symptom}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Enhanced Selected Symptoms */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground/70">
                    Selected Symptoms ({selectedSymptoms.length})
                  </p>
                  {selectedSymptoms.length > 0 && (
                    <button
                      onClick={() => setSelectedSymptoms([])}
                      className="text-xs text-foreground/50 hover:text-accent transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {selectedSymptoms.length === 0 ? (
                  <div className="text-center py-8 px-4 bg-muted/30 rounded-2xl border-2 border-dashed border-border/50">
                    <div className="w-12 h-12 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Search className="w-6 h-6 text-foreground/40" />
                    </div>
                    <p className="text-sm text-foreground/50">No symptoms selected</p>
                    <p className="text-xs text-foreground/40 mt-1">Start typing to search and select symptoms</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
                    {selectedSymptoms.map((symptom, index) => (
                      <div
                        key={symptom.id}
                        className="group flex items-center justify-between bg-gradient-to-r from-background to-muted/20 p-3 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                            {index + 1}
                          </div>
                          <span className="font-medium text-foreground text-sm">{symptom.name}</span>
                        </div>
                        <button
                          onClick={() => removeSymptom(symptom.id)}
                          className="w-6 h-6 rounded-full bg-destructive/10 hover:bg-destructive/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                        >
                          <X size={14} className="text-destructive" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Enhanced Analyze Button */}
              <div className="space-y-3">
                <button
                  onClick={analyzeSymptoms}
                  disabled={selectedSymptoms.length === 0}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '500',
                    boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                    width: 'auto',
                    minWidth: '160px'
                  }}
                  className="bg-gradient-to-r from-primary via-primary to-secondary text-white shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Zap className="w-3 h-3" />
                    Analyze Symptoms
                  </span>
                </button>

                {selectedSymptoms.length > 0 && (
                  <p className="text-xs text-foreground/60 text-center">
                    {selectedSymptoms.length} symptom{selectedSymptoms.length !== 1 ? 's' : ''} selected for analysis
                  </p>
                )}
              </div>

              {/* Enhanced Quick Actions */}
              <div className="border-t border-border/50 pt-6 space-y-4">

                {/* Health Stats Summary */}
                {selectedSymptoms.length > 0 && (
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-2xl p-4">
                    <h5 className="font-semibold text-foreground mb-2 text-sm">Analysis Ready</h5>
                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-background/50 rounded-lg p-2">
                        <p className="text-lg font-bold text-primary">{selectedSymptoms.length}</p>
                        <p className="text-xs text-foreground/60">Symptoms</p>
                      </div>
                      <div className="bg-background/50 rounded-lg p-2">
                        <p className="text-lg font-bold text-secondary">{Math.min(selectedSymptoms.length * 15, 95)}%</p>
                        <p className="text-xs text-foreground/60">Accuracy</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {/* Diagnosis Results */}
            {diagnosisResults.length > 0 && (
              <div id="diagnosis-results" className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Possible Conditions</h2>
                </div>

                <div className="space-y-4">
                  {diagnosisResults.map((result, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedCondition(result.condition)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                        selectedCondition === result.condition
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 bg-background"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-foreground">{result.condition}</h3>
                        <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                          {Math.round(result.probability)}%
                        </span>
                      </div>
                      <p className="text-foreground/70 text-sm">{result.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Treatment Section */}
            {selectedCondition && getTreatment(selectedCondition) && (
              <>
                {/* Medicines */}
                <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                  <div className="flex items-center gap-2 mb-6">
                    <Pill className="w-6 h-6 text-secondary" />
                    <h2 className="text-2xl font-bold text-foreground">Recommended Medicines</h2>
                  </div>

                  <div className="space-y-4">
                    {getTreatment(selectedCondition)?.medicines.map((medicine, idx) => (
                      <div key={idx} className="bg-background rounded-lg p-4 border border-border/50">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-foreground">{medicine.name}</h3>
                          <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-xs font-semibold">
                            {medicine.duration}
                          </span>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">Dosage</p>
                            <p className="font-semibold text-foreground">{medicine.dosage}</p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">Frequency</p>
                            <p className="font-semibold text-foreground">{medicine.frequency}</p>
                          </div>
                          <div>
                            <p className="text-xs text-foreground/60 mb-1">Side Effects</p>
                            <p className="font-semibold text-foreground text-sm">{medicine.sideEffects}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Home Remedies */}
                <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-secondary" />
                    Home Remedies
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {getTreatment(selectedCondition)?.homeRemedies.map((remedy, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-background rounded-lg p-3">
                        <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-secondary text-xs font-bold">✓</span>
                        </div>
                        <p className="text-foreground text-sm">{remedy}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Precautions */}
                <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-6 h-6 text-accent" />
                    <h2 className="text-2xl font-bold text-foreground">Precautions & Safety</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="font-bold text-foreground mb-3 text-green-600">Do's</h3>
                      <div className="space-y-2">
                        {getTreatment(selectedCondition)?.dos.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-foreground text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-3 text-red-600">Don'ts</h3>
                      <div className="space-y-2">
                        {getTreatment(selectedCondition)?.donts.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <XCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                            <p className="text-foreground text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <p className="text-sm text-foreground/80">
                      <strong>General Precautions:</strong> {getTreatment(selectedCondition)?.precautions.join(" • ")}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={saveToHealthRecord}
                    className="flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/20 text-secondary px-4 py-3 rounded-lg font-semibold transition cursor-pointer"
                  >
                    <Save size={20} />
                    Save Record
                  </button>

                  <button className="flex items-center justify-center gap-2 bg-accent/10 hover:bg-accent/20 text-accent px-4 py-3 rounded-lg font-semibold transition cursor-pointer">
                    <Phone size={20} />
                    Consult Doctor
                  </button>
                </div>
              </>
            )}

            {/* Saved Records */}
            {savedRecords.length > 0 && (
              <div className="bg-card rounded-2xl shadow-lg p-6 border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Your Health Records
                </h3>
                <div className="space-y-2">
                  {savedRecords.map((record, idx) => (
                    <div key={idx} className="flex items-start justify-between bg-background rounded-lg p-3">
                      <p className="text-sm text-foreground">{record}</p>
                      <button className="text-foreground/50 hover:text-accent transition cursor-pointer">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom styles for scrollbar */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: rgb(156 163 175) transparent;
            }
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: rgb(156 163 175);
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: rgb(107 114 128);
            }
          `
        }} />
      </div>
    </div>
  )
}
