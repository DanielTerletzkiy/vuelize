<template>
  <DCard elevation-light block>
    <div class="pa-4">
      <DAccordion outlined>
        <template v-slot:header>
          This is an Accordion
        </template>
        This is the content
      </DAccordion>
    </div>

    <DCardTitle color="primary">
      This is a title
    </DCardTitle>
    <DCardSubtitle>
      This is a subtitle
    </DCardSubtitle>

    <DCardContent>
      <DColumn gap>
        <DButton color="primary" glow elevation-light="4" @click="changeTheme">dark {{ $vuelize.theme.dark }}
          <template v-slot:prefix>
            <DIcon name="flask"/>
          </template>
          <template v-slot:suffix>
            <DIcon name="angle-right-b"/>
          </template>
        </DButton>
        <DRow gap space-between
              v-for="(option, i) in [
                  {filled: false, outlined: true, depressed: false},
                  {filled: false, outlined: true, depressed: true},
                  {filled: false, outlined: false, depressed: true},
                  {filled: true, outlined: false, depressed: false}]" :key="i">
          <DLabel
              style="text-transform: capitalize"
              v-for="(label,x) in [
                {color: 'success',rounded:'md',icon:'check'},
                {color: 'error',rounded:'lg',icon:'exclamation-triangle'},
                {color: 'warning',rounded:'xl',icon:'exclamation-octagon'},
                {color: 'info',rounded:'pill',icon:'info-circle'},
                {color: 'currentColor',rounded:'none',icon:'info-circle'},]"
              :key="x"
              v-bind="{...option, ...label}"
              clickable>
            <template v-slot:prefix>
              <DIcon :name="label.icon" size="20"/>
            </template>
            <template v-slot:suffix>
              <span style="font-size: 0.6rem">{{ label.rounded }}</span>
            </template>
            {{ label.color }}
          </DLabel>
        </DRow>
        <DRow gap>
          <DAvatar color="primary">
            <DIcon name="flask" :color="vuelize.getColorContrast('currentColor', 0)"/>
          </DAvatar>
          <DTooltip color="error" filled position="left">
            <DAvatar color="error" :tint="100">
              <DIcon name="flask" color="error" :tint="0" :size="40"/>
            </DAvatar>
            <template v-slot:tooltip>
              Erroreeeeeeeeeeee
            </template>
          </DTooltip>
          <DTooltip color="primary" filled position="right">
            <DIconButton color="primary" name="flask" active/>
            <template v-slot:tooltip>
              This is content
            </template>
          </DTooltip>
          <DTooltip color="error" filled position="top">
            <DAvatar color="error" :tint="100">
              <DIcon name="flask" color="error" :tint="0" :size="40"/>
            </DAvatar>
            <template v-slot:tooltip>
              Error
            </template>
          </DTooltip>
          <DTooltip color="primary" filled position="bottom">
            <DIconButton color="primary" name="flask" active/>
            <template v-slot:tooltip>
              This is content
            </template>
          </DTooltip>
        </DRow>
        <DTextfield v-model="textfield" filled color="primary" label="Test"/>
        <DCheckbox color="primary" off-icon="times" v-model="fill">
          Check for filled List
        </DCheckbox>
        <DList v-model="list" color="primary" class="font-weight-bold" :filled="fill" elevation-dark="2">
          <DListItem v-for="i in 10" :key="i">
            List number {{ i }}
            <DSpacer/>
            <DLabel>
              <template v-slot:prefix>
                <DIcon name="check" size="20"/>
              </template>
              Status
            </DLabel>
          </DListItem>
        </DList>
        <DTabList v-model="list" color="primary" class="font-weight-bold" :filled="fill" elevation-dark="2"
                  showIndicator outlined>
          <DListItem v-for="i in 4" :key="i">
            Tab number {{ i }}
            <DSpacer/>
            <DLabel>
              <template v-slot:prefix>
                <DIcon name="check" size="20"/>
              </template>
              Status
            </DLabel>
          </DListItem>
        </DTabList>
        <DDotLoader :model-value="true" color="primary" :amount="20" :speed="page*100" side-to-side/>
        <DElevationLoader :model-value="true" color="primary" :amount="100" :default-size="50" :columns="10"
                          :speed="page*100"/>
        <DProgressbar v-model="page" :max="10" color="primary"/>
        <DPagination v-model="page" :total="10" :visible-buttons="4" color="primary" rounded="circle"/>
        <DDivider class="my-2"/>
        <DTable outlined :headers="table.headers" :data="table.data" :visible-items="page">
          <template #data(name)="{value, color, params}">
            <DCardSubtitle :color="color">
              <DAvatar :src="params.url" size="34"/>
              {{ value }}
            </DCardSubtitle>
          </template>
          <template #data(status)="{value, color}">
            <DLabel :color="color">{{ value }}</DLabel>
          </template>
        </DTable>
      </DColumn>
    </DCardContent>
  </DCard>
</template>

<script setup lang="ts">
import {State} from "../types/Vuelize";
import {inject, onMounted, reactive, ref} from 'vue'
import DCard from "./card/DCard.vue";
import DCardSubtitle from "./card/text/DCardSubtitle.vue";
import DCardTitle from "./card/text/DCardTitle.vue";
import DButton from "./button/DButton.vue";
import DCardContent from "./card/content/DCardContent.vue";
import DCheckbox from "./checkbox/DCheckbox.vue";
import DIcon from "./icon/DIcon.vue";
import DLabel from "./label/DLabel.vue";
import DRow from "./flex/DRow.vue";
import DColumn from "./flex/DColumn.vue";
import DList from "./list/DList.vue";
import DListItem from "./list/DListItem.vue";
import DAvatar from "./avatar/DAvatar.vue";
import DIconButton from "./button/DIconButton.vue";
import DSpacer from "./flex/DSpacer.vue";
import DDotLoader from "./loader/DDotLoader.vue";
import DProgressbar from "./progress/DProgressbar.vue";
import DPagination from "./pagination/DPagination.vue";
import DTable from "./table/DTable.vue";
import DDivider from "./divider/DDivider.vue";
import DTextfield from "./textfield/DTextfield.vue";
import DAccordion from "./accordion/DAccordion.vue";
import DTooltip from "./tooltip/DTooltip.vue";
import DElevationLoader from "./loader/DElevationLoader.vue";

const vuelize: Vuelize = inject('vuelize') as Vuelize;

const textfield = ref('');
const fill = ref(false);
const list = ref(1);
const page = ref(5);

const table = reactive({
  headers: [
    {
      value: 'Name',
      key: 'name',
      type: String,
      color: 'primary',
    }, {
      value: 'Status',
      key: 'status',
      type: String,
      width: '100px',
    },
  ],
  data: [
    [
      {
        value: 'Daniel Terletzkiy',
        key: 'name',
        params: {
          url: 'https://lh3.googleusercontent.com/ogw/ADea4I4NxveiFgsg1uyb7tASZE7EdsQzXH8hBvCOW9t0bhI=s32-c-mo'
        }
      },
      {
        value: 'Active',
        key: 'status',
        color: 'success',
      }
    ],
    [
      {
        value: 'Mogus',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ],
    [
      {
        value: '2',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ],
    [
      {
        value: '3',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ],
    [
      {
        value: '4',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ], [
      {
        value: '5',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ], [
      {
        value: '6',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ], [
      {
        value: '7',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ], [
      {
        value: '8',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ], [
      {
        value: '9',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ], [
      {
        value: '10',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ], [
      {
        value: '11',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ], [
      {
        value: '12',
        key: 'name',
        params: {
          url: 'https://i.kym-cdn.com/photos/images/newsfeed/002/195/255/a67.png'
        }
      },
      {
        value: 'Inactive',
        key: 'status',
        color: 'error',
      }
    ],
  ]
})

const emit = defineEmits(['counterChange'])

const counter = reactive({
  count: 0,
  click: {
    down: 0,
    up: 0
  }
})

function emitCounter(): void {
  emit('counterChange', counter.count)
}

function increment(): void {
  counter.count++;
  counter.click.up++;
  emitCounter();
}

function decrement(): void {
  counter.count--;
  counter.click.down++;
  emitCounter();
}

function changeTheme(): void {
  vuelize.theme.dark = !vuelize.theme.dark
}

onMounted(async () => {
  for (let i = 0; i < 6; i++) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500))
    vuelize.notify(i.toString(), 'test body', State.Error);
  }
})

</script>

<style scoped lang="scss">
label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
