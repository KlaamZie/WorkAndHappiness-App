export function getForm(formData, form) {
	if (form.length === 0) {
		let itemsGroup1 = [];
		let marksGroup1 = [];
		let formArrayGroup1 = [
			[]
		];

		let itemsGroup2 = [];
		let marksGroup2 = [];
		let formArrayGroup2 = [
			[]
		];

		let itemsGroup3 = [];
		let marksGroup3 = [];
		let formArrayGroup3 = [
			[]
		];

		let itemsGroup4 = [];
		let marksGroup4 = [];
		let formArrayGroup4 = [
			[]
		];

		if (formData.Group1) {
			for (let i = 0; i < Object.keys(formData.Group1.item).length - 1; i++) {
				itemsGroup1.push(Object.values(formData.Group1.item)[i])
			}
			marksGroup1.push({
				value: 1,
				label: Object.values(formData.Group1.item.notation)[0],
			}, {
				value: 2,
				label: Object.values(formData.Group1.item.notation)[1],
			}, {
				value: 3,
				label: Object.values(formData.Group1.item.notation)[2],
			}, {
				value: 4,
				label: Object.values(formData.Group1.item.notation)[3],
			}, {
				value: 5,
				label: Object.values(formData.Group1.item.notation)[4]
			});
			formArrayGroup1[0] = itemsGroup1.slice();
			formArrayGroup1.push(marksGroup1);
			form.push(formArrayGroup1);
		}
		if (formData.Group2) {
			for (let i = 0; i < Object.keys(formData.Group2.item).length - 1; i++) {
				itemsGroup2.push(Object.values(formData.Group2.item)[i])
			}
			marksGroup2.push({
				value: 1,
				label: Object.values(formData.Group2.item.notation)[0],
			}, {
				value: 2,
				label: Object.values(formData.Group2.item.notation)[1],
			}, {
				value: 3,
				label: Object.values(formData.Group2.item.notation)[2],
			}, {
				value: 4,
				label: Object.values(formData.Group2.item.notation)[3],
			}, {
				value: 5,
				label: Object.values(formData.Group2.item.notation)[4]
			});
			formArrayGroup2[0] = itemsGroup2.slice();
			formArrayGroup2.push(marksGroup2);
			form.push(formArrayGroup2);
		}
		if (formData.Group3) {
			for (let i = 0; i < Object.keys(formData.Group3.item).length - 1; i++) {
				itemsGroup3.push(Object.values(formData.Group3.item)[i])
			}
			marksGroup3.push({
				value: 1,
				label: Object.values(formData.Group3.item.notation)[0],
			}, {
				value: 2,
				label: Object.values(formData.Group3.item.notation)[1],
			}, {
				value: 3,
				label: Object.values(formData.Group3.item.notation)[2],
			}, {
				value: 4,
				label: Object.values(formData.Group3.item.notation)[3],
			}, {
				value: 5,
				label: Object.values(formData.Group3.item.notation)[4]
			});
			formArrayGroup3[0] = itemsGroup3.slice();
			formArrayGroup3.push(marksGroup3);
			form.push(formArrayGroup3);
		}
		if (formData.Group4) {
			for (let i = 0; i < Object.keys(formData.Group4.item).length - 1; i++) {
				itemsGroup4.push(Object.values(formData.Group4.item)[i])
			}
			marksGroup4.push({
				value: 1,
				label: Object.values(formData.Group4.item.notation)[0],
			}, {
				value: 2,
				label: Object.values(formData.Group4.item.notation)[1],
			}, {
				value: 3,
				label: Object.values(formData.Group4.item.notation)[2],
			}, {
				value: 4,
				label: Object.values(formData.Group4.item.notation)[3],
			}, {
				value: 5,
				label: Object.values(formData.Group4.item.notation)[4]
			});
			formArrayGroup4[0] = itemsGroup4.slice();
			formArrayGroup4.push(marksGroup4);
			form.push(formArrayGroup4);
		}
	}
}
