// import { SelectItem } from 'primeng/api';
// export function getSelectedValueEnum(Enumvalues: any, Enumtitles :any):SelectItem[]
// {
//   let list:SelectItem[]=[]
//   let values:string[]=[];
//   let titles:string[]=[];
//   for (let item in Enumvalues) {
//     var isValueProperty = parseInt(item, 10) >= 0
//  if (isValueProperty) {
//   values.push(item);
//  }else{
//   titles.push( Enumtitles[item]);
//  }
// }
// for (let index = 0; index < values.length; index++) {
//   list.push({ label: titles[index], value: values[index] });
// }
//   return list;
// }
import { SelectItem } from 'primeng/api';
export function getSelectedValueEnum(Enumvalues: any, Enumtitles: any,addFirstRowChoosen:boolean=true): SelectItem[] {
  let list: SelectItem[] = [];
  let item: string;
  if(addFirstRowChoosen)
    list.push({ label: 'انتخاب کنید', value: null });
  for (let index = 0; index < Object.keys(Enumtitles).length; index++) {
    item = Object.keys(Enumtitles)[index];
    list.push({ label: Enumtitles[item], value: parseInt(Enumvalues[item])});
  }
  return list;
}
export function getStringSelectedValueEnum(Enumvalues: any, Enumtitles: any,selected:number): string {
  let item: string;
  for (let index = 0; index < Object.keys(Enumvalues).length; index++) {
    item = Object.keys(Enumtitles)[index];
    if(parseInt(Enumvalues[item])==selected){
      return  Enumtitles[item];
    }
  }
  return item;
}
