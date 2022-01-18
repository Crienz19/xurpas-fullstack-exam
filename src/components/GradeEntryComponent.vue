<template>
    <div class="row">
      <div class="col-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Grade entry</h3>
          </div>
          <div class="card-body">
            <div class="form-group my-2">
              <label for="grades">Grades</label>
              <textarea v-model="grade" cols="30" rows="10" class="form-control"></textarea>
            </div>
          </div>
          <div class="card-footer">
            <button @click="addGrade()" class="btn btn-primary btn-sm">Submit</button>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title">Grades List</h3>
          </div>
          <div class="card-body p-0">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th class="text-center">Student Grade</th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody v-if="grades.length > 0">
                <tr v-for="(grade, key) in grades" :key="key">
                  <td>{{ grade.student }}</td>
                  <td class="text-center">{{ grade.grade }} %</td>
                  <td class="text-center">
                    <button class="btn btn-danger btn-sm" @click="removeSelectedGrade(key)">Delete</button>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                  <tr class="text-center">
                      <td colspan="3">No records</td>
                  </tr>
              </tbody>
            </table>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <button @click="showAverage()" class="btn btn-success btn-sm">Get Average</button>
            <button @click="clearFields()" class="btn btn-primary btn-sm">Clear fields</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import useGrade from "@/composables/grade";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
    name: 'grade-entry-component',
    setup () {
        const { grades, add, remove, removeAll, getAverage } = useGrade();

        const form = reactive({
            grade: ''
        });

        const addGrade = async () => {
          await add(form.grade);

          form.grade = '';
        }

        const removeSelectedGrade = async (key : number) => {
            await remove(key);
        }

        const clearFields = async () => {
            let isClearField = confirm('Clear all fields?');

            if (isClearField) {
                await removeAll();
                alert('Field cleared!');
            }
        }

        const showAverage = async () => {
            let average = await getAverage();

            alert(`${average}`);
        }

        return {
            ...toRefs(form),
            grades,
            addGrade,
            removeSelectedGrade,
            clearFields,
            showAverage
        }
    }
})
</script>