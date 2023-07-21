import List from "list.js";

class Birth {

  constructor(id, text) {
    this.id = id;
    this.text = text;
    this.emptyDay = "В этот день никто не родился";
    this.emptyMonth = "В этом месяце никто не родился";
    this.emptyWeek = "В ближайшую неделю никто не родился";
    this.list = new List(this.id, this.getOptions(), this.getPersons());
  }

  getOptions = () => {
    return {
      valueNames: ["name", "birth"],
      item: `<div class="flex justify-between py-3 border-b">
        <div class="name"></div>
        <div class="birth"></div>
      </div>`,
    }
  }

  getPersons = () => {
    const lines = this.text.split("\r\n");
    const persons = lines.map((line) => {
      const fields = line.split(",");
      return { name: fields[0], birth: fields[1] };
    });
    return this.filterPersons(persons);
  }

  filterPersons = (persons) => {
    let filtered;
    switch (this.id) {
      case "day":
        filtered = persons.filter(this.currentDay);
        if (!filtered.length) filtered = [{ name: this.emptyDay, birth: "" }];
        break;
      case "soon":
        filtered = persons.filter(this.nextWeek);
        if (!filtered.length) filtered = [{ name: this.emptyWeek, birth: "" }];
        else filtered = this.sortByBirth(filtered);
        break;
      case "month":
        filtered = persons.filter(this.currentMonth);
        if (!filtered.length) filtered = [{ name: this.emptyMonth, birth: "" }];
        else filtered = this.sortByBirth(filtered);
        break;
      default:
        filtered = persons;
    }
    return filtered;
  }

  sortByBirth = (persons) => {
    return persons.sort((a, b) => {
      if (a.birth > b.birth) return 1;
      else if (a.birth < b.birth) return -1;
      else return 0;
    });
  }

  sortByName = (persons) => {
    return persons.sort((a, b) => {
      if (a.name > b.name) return 1;
      else if (a.name < b.name) return -1;
      else return 0;
    });
  }

  currentDay = (person) => {
    const birthParts = person.birth.split(".");
    const birthMonth = parseInt(birthParts[1]);
    const birthDay = parseInt(birthParts[0]);
    const birthOffset = birthMonth * 100 + birthDay;
    const nowDate = new Date();
    const nowMonth = nowDate.getMonth() + 1;
    const nowDay = nowDate.getDate();
    const nowOffset = nowMonth * 100 + nowDay;
    return birthOffset === nowOffset;
  }

  currentMonth = (person) => {
    const birthParts = person.birth.split(".");
    const birthMonth = parseInt(birthParts[1]);
    const nowDate = new Date();
    const nowMonth = nowDate.getMonth() + 1;
    return birthMonth === nowMonth;
  }

  nextWeek = (person) => {
    const birthParts = person.birth.split(".");
    const birthMonth = parseInt(birthParts[1]);
    const birthDay = parseInt(birthParts[0]);
    const birthOffset = birthMonth * 100 + birthDay;
    const nowDate = new Date();
    const nowMonth = nowDate.getMonth() + 1;
    const nowDay = nowDate.getDate();
    const nowOffset = nowMonth * 100 + nowDay;
    const weekDate = new Date();
    weekDate.setDate(weekDate.getDate() + 7);
    const weekMonth = weekDate.getMonth() + 1;
    const weekDay = weekDate.getDate();
    const weekOffset = weekMonth * 100 + weekDay;
    return (birthMonth > nowMonth) && (birthMonth < weekMonth);
  }

}

fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vT-5j3rZHVbVl3fdH6Up-V_eRkb35Qb6Hev1cY0FQgi6RKGrinIiJdDkBno-XxPHMpKO_3MK6Npwakb/pub?gid=0&single=true&output=csv")
  .then(response => response.text())
  .then(text => {
    const day = new Birth("day", text);
    const soon = new Birth("soon", text);
    const month = new Birth("month", text);
    const all = new Birth("all", text);
  });