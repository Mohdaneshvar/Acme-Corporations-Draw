export enum SortOrder {
    ASC = 1,
    DESC = 2,
}

export function Sort<T>(data: T[], col: string | number, order: SortOrder): T[] {
    if (data && data.length > 0) {
        let asc: number = 1;
        let desc: number = -1;

        let property: string;

        if (isNaN(col as number)) {
            property = col as string;
        } else {
            const first: T = data[0];
            property = Object.keys(first)[(col as number) - 1];
        }

        switch (order) {
            case SortOrder.ASC: { asc = 1; desc = -1; break; }
            case SortOrder.DESC: { asc = -1; desc = 1; break; }
        }

        return data.sort((a, b) => {
            if (a[property] > b[property]) { return asc; }
            if (a[property] < b[property]) { return desc; }

            return 0;
        });
    } else {
        return data;
    }
}
