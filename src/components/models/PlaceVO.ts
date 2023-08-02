export default class PlaceVO {
    constructor(
        public address_name: string,    //지번주소
        public category_group_code: string, //그룹코드
        public category_group_name: string, //그룹명
        public distance: string,    //위치와의 거리
        public id: string,
        public phone: string,   //연락처
        public place_name: string,  //장소명
        public place_url: string,   //장소 url
        public road_address_name: string,   //도로명 주소
        public x: string,   //lat
        public y: string,   //lng
    ) {}
}