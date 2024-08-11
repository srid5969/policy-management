import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersPoliciesManagementService } from '../services/users-policies.service.';
import { CommonSuccessResponseObject } from './../../common/constants';

@Controller('users-policies')
export class UsersPolicyManagementController {
  constructor(private usersPolicyService: UsersPoliciesManagementService) {}

  // Bulk import records from csv
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async importRecords(@UploadedFile() file: Express.Multer.File) {
    const result = await this.usersPolicyService.importCsv(file);
    const response = {
      ...CommonSuccessResponseObject,
      message: 'Records imported successfully',
      data: result,
    };
    return response;
  }
}
