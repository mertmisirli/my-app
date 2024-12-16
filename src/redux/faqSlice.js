import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    questions: [
        {
            id: 1,
            questionText: 'What is the best workout for weight loss?',
            answer: 'The best workout for weight loss typically includes a mix of cardiovascular exercises like running or cycling, along with strength training to build lean muscle mass, which helps burn fat more efficiently.'
        },
        {
            id: 2,
            questionText: 'How often should I train each muscle group?',
            answer: 'It is generally recommended to train each muscle group 2-3 times a week, allowing at least 48 hours of rest between sessions targeting the same muscles.'
        },
        {
            id: 3,
            questionText: 'What are compound exercises and why are they important?',
            answer: 'Compound exercises involve multiple muscle groups and joints, such as squats, deadlifts, and bench presses. They are important because they allow you to lift heavier weights, burn more calories, and improve overall strength and muscle development.'
        },
        {
            id: 4,
            questionText: 'How can I improve my core strength?',
            answer: 'Core strength can be improved through exercises like planks, Russian twists, leg raises, and various stability ball exercises that target the abdominal and lower back muscles.'
        },
        {
            id: 5,
            questionText: 'What is the difference between aerobic and anaerobic exercise?',
            answer: 'Aerobic exercise is low to moderate-intensity activity that uses oxygen to fuel the muscles, such as running or swimming. Anaerobic exercise involves short bursts of high-intensity activity like weight lifting or sprinting, where the muscles don’t rely on oxygen for fuel.'
        },
        {
            id: 6,
            questionText: 'How can I build muscle mass?',
            answer: 'To build muscle mass, focus on progressive overload by gradually increasing the weight you lift. Incorporate a balanced workout routine with compound exercises and ensure you are consuming enough protein and calories for muscle repair and growth.'
        },
        {
            id: 7,
            questionText: 'What are some effective stretches before a workout?',
            answer: 'Effective stretches include dynamic movements like leg swings, arm circles, and lunges. Static stretches like hamstring stretches and quad stretches can be done post-workout to improve flexibility and reduce soreness.'
        },
        {
            id: 8,
            questionText: 'How do I prevent injury during a workout?',
            answer: 'To prevent injury, always warm up before starting your workout, maintain proper form during exercises, avoid lifting too heavy too soon, and listen to your body to avoid overtraining.'
        },
        {
            id: 9,
            questionText: 'What is HIIT and why is it popular?',
            answer: 'HIIT (High-Intensity Interval Training) is a workout that alternates between short bursts of intense exercise and periods of rest or low-intensity exercise. It’s popular because it maximizes fat burn in a short amount of time, improves cardiovascular health, and boosts metabolism.'
        },
        {
            id: 10,
            questionText: 'Can I lose weight without cardio?',
            answer: 'Yes, it is possible to lose weight without cardio by focusing on a calorie deficit through diet and incorporating strength training exercises to increase muscle mass and boost metabolism.'
        },
        {
            id: 11,
            questionText: 'What is the importance of rest days in a workout routine?',
            answer: 'Rest days are crucial for muscle recovery and growth. They allow the muscles to repair, prevent overtraining, reduce the risk of injury, and ensure sustained progress in your fitness goals.'
        },
        {
            id: 12,
            questionText: 'How many sets and reps should I do for strength training?',
            answer: 'For strength training, it iss common to perform 3-5 sets of 4-6 reps with heavier weights for maximal strength, or 8-12 reps for hypertrophy(muscle growth) with moderate weights.'
        },
        {
            id: 13,
            questionText: 'What is the role of protein in muscle recovery?',
            answer: 'Protein plays a vital role in muscle recovery by providing the amino acids needed for muscle repair and growth. Consuming protein post-workout helps promote recovery and reduces muscle soreness.'
        },
        {
            id: 14,
            questionText: 'What should I eat before a workout?',
            answer: 'It’s best to eat a balanced meal 1-2 hours before a workout that includes carbohydrates for energy and protein for muscle repair. Examples include a banana with peanut butter or a small chicken and rice meal.'
        },
        {
            id: 15,
            questionText: 'How long should a workout session last?',
            answer: 'A typical workout session lasts between 45-90 minutes, depending on your goals, fitness level, and the type of exercise. Intense strength training sessions may be shorter, while endurance-focused workouts may last longer.'
        }
    ]
}

export const questionsSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {

        // setInputText: (state, action) => {
        //   state.inputText = action.payload;
        //   // inputText değiştiğinde filteredNews'i güncelle
        //   if (action.payload.length === 0) {
        //     state.filteredNews = state.news; // inputText boşsa tüm haberleri göster
        //   } else {
        //     // inputText varsa filtreleme yap
        //     state.filteredNews = state.news.filter(item =>
        //       item.title.toLowerCase().includes(action.payload.toLowerCase())
        //     );
        //   }
        // },

    }
});

export const { setInputText } = questionsSlice.actions;

export default questionsSlice.reducer;
