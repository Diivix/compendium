
export interface ISpell {
  id: number,
  name: string,
  classTypes: string[],
  components: string[],
  school: string,
  level: number,
  castingTime: string,
  range: string,
  materials: string,
  duration: string
  description?: string,
  atHigherLevels?: string,
  reference?: string
};