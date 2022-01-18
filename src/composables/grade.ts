import { readonly, ref } from "vue";

export interface GradesType {
    student: string,
    grade: number
}

export default function useGrade() {
    const grades = ref<GradesType[]>([])

    const add = async (data : string) => {

        const splitEnterArray = data.split("\n");

        splitEnterArray.forEach(e => {
            const splitSpaceArray = e.split(" ");
            
            grades.value.push({ 
                'student': splitSpaceArray[0],
                'grade': Number(splitSpaceArray[1]) 
            });
        });
    }

    const remove = async (key : number) => {
        
        grades.value.splice(key, 1);
    }

    const removeAll = async () => {
        grades.value = [];
    }

    const getAverage = async () : Promise<string> => {
        let totalGrades = 0;
        const totalEntries = grades.value.length;

        if (totalEntries === 0) {
            return 'empty';
        }

        grades.value.forEach(grade => {
            totalGrades += Number(grade.grade);
        });

        const classAverage = totalGrades / totalEntries;

        return `Class average: ${classAverage.toFixed(1)}%`;
    }

    return {
        grades: readonly(grades),
        getAverage,
        add,
        remove,
        removeAll
    }
}